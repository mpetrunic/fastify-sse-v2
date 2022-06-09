import {expect} from "chai";
import {FastifyInstance, EventMessage, RouteHandler} from "fastify4";
import {getEventSource, getFastifyServer, getBaseUrl} from "./utils";
import pushable, {Pushable} from "it-pushable";
import sinon from "sinon";
import {get} from "http";

declare module "fastify4" {

  interface EventMessage {
    /**
     * Message payload
     */
    data?: string;

    /**
     * Message identifier, if set, client will send `Last-Event-ID: <id>` header on reconnect
     */
    id?: string;

    /**
     * Message type
     */
    event?: string;

    /**
     * Update client reconnect interval (how long will client wait before trying to reconnect).
     */
    retry?: number;
  }

  interface FastifyReply {
    sseContext: {source: Pushable<EventMessage>};
    sse(source: AsyncIterable<EventMessage> | EventMessage): void;
  }
}

describe("Fastify@4 - Test SSE plugin", function () {

  let server: FastifyInstance;
  let source: Pushable<EventMessage>;
  
  beforeEach(async function () {
    source = pushable<EventMessage>();
    server = await getFastifyServer(source);
  });
  
  afterEach(async function () {
    source.end();
    if(server) {
      await server.close(); 
    }
  });
  
  it("should open event stream", function (done) {
    const eventsource = getEventSource(server);
    eventsource.addEventListener("open", function () {
      expect(eventsource.readyState).to.equal(eventsource.OPEN);
      eventsource.close();
      done();
    });
  });
  
  it("should set plugin headers", function (done) {
    try {
      get(getBaseUrl(server), {timeout: 100}, (res) => {
        expect(res.headers["x-test-header2"]).to.be.deep.equal("test2");
        res.destroy();
        done();
      });
    } catch(e) {
      done(e);
    }
  });

  it("should set retry", function (done) {
    const eventsource = getEventSource(server);
    eventsource.addEventListener("open", function () {
      source.end();
    });
    eventsource.addEventListener("error", function () {
      // @ts-ignore
      expect(eventsource.reconnectInterval).to.be.equal(3000);
      eventsource.close();
      done();
    });
  });

  it("should end client", function (done) {
    const eventsource = getEventSource(server);
    eventsource.addEventListener("open", function () {
      source.end();
    });
    eventsource.addEventListener("message", function () {
      eventsource.close();
      throw "shouldn't be called";
    });
    eventsource.addEventListener("end", function (e: Event) {
      expect(e.type).to.be.equal("end");
      // @ts-ignore
      expect(e.data).to.be.equal("Stream closed");
      eventsource.close();
      done();
    });
  });

  it("should send single event", function (done) {
    const eventsource = getEventSource(server);
    source.push({data: "Something", id: "1", event: "message"});
    eventsource.onmessage = (evt => {
      expect(evt.data).equal("Something");
      expect(evt.type).equal("message");
      expect(evt.lastEventId).equal("1");
      eventsource.close();
      done();
    });

  });

  it("should send multiple events without async iterable", function (done) {
    const handler: RouteHandler = async (req, resp): Promise<void> => {
      for await( const event of source) {
        resp.sse(event);
        return resp;
      }

    };
    getFastifyServer(handler).then((server2) => {
      const eventsource = getEventSource(server2);
      source.push({id: "1", event: "message", data: "Something"});
      eventsource.onmessage = (evt => {
        expect(evt.data).equal("Something");
        expect(evt.type).equal("message");
        expect(evt.lastEventId).equal("1");
        eventsource.close();
        server2.close();
        done();
      });
    });
    
  });

  it("should send multiple events", function (done) {
    const eventsource = getEventSource(server);
    source.push({id: "1", event: "message", data: "Something"});
    source.push({id: "2", event: "message", data: "Something"});
    source.end();
    const spy = sinon.spy();
    eventsource.onmessage = (() => spy());
    eventsource.onerror = (() => {
      expect(spy.callCount).to.be.equal(2);
      eventsource.close();
      done();
    });

  });

});
