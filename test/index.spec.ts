import {expect} from "chai";
import {FastifyInstance, EventMessage} from "fastify";
import {getEventSource, getFastifyServer} from "./utils";
import pushable, {Pushable} from "it-pushable";
import sinon from "sinon";

describe("Test SSE plugin", function () {

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
    source.push({id: "1", event: "message", data: "Something"});
    eventsource.onmessage = (evt => {
      expect(evt.data).equal("Something");
      expect(evt.type).equal("message");
      expect(evt.lastEventId).equal("1");
      eventsource.close();
      done();
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
