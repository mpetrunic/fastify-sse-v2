import { get } from "http";
import { expect } from "chai";
import { FastifyInstance, EventMessage, RouteHandler } from "fastify";
import EventSource from "eventsource";
import pushable, { Pushable } from "it-pushable";
import sinon from "sinon";
import { getEventSource, getFastifyServer, getBaseUrl } from "./utils";

describe("Fastify - Test SSE plugin", function () {
  let server: FastifyInstance;
  let source: Pushable<EventMessage>;

  beforeEach(async function () {
    source = pushable<EventMessage>();
    server = await getFastifyServer(source);
  });

  afterEach(async function () {
    source.end();
    if (server) {
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
      get(getBaseUrl(server), { timeout: 100 }, (res) => {
        expect(res.headers["x-test-header2"]).to.be.deep.equal("test2");
        res.destroy();
        done();
      });
    } catch (e) {
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
    eventsource.addEventListener("error", function (e) {
      if (e.data == undefined) {
        // Connection closed by server
        eventsource.close();
        done();
      } else {
        throw "shouldn't happen";
      }
    });
  });

  it("should send single event", function (done) {
    const eventsource = getEventSource(server);
    source.push({ data: "Something", id: "1", event: "message" });
    eventsource.onmessage = (evt) => {
      expect(evt.data).equal("Something");
      expect(evt.type).equal("message");
      expect(evt.lastEventId).equal("1");
      eventsource.close();
      done();
    };
  });

  it("should send single event with multiline message", function (done) {
    const eventsource = getEventSource(server);
    source.push({ data: "Something\nSomethingInNewLine", id: "1", event: "message" });
    eventsource.onmessage = (evt) => {
      expect(evt.data).equal("Something\nSomethingInNewLine");
      expect(evt.type).equal("message");
      expect(evt.lastEventId).equal("1");
      eventsource.close();
      done();
    };
  });

  it("should send multiple events without async iterable", function (done) {
    const handler: RouteHandler = async (req, resp): Promise<void> => {
      for await (const event of source) {
        resp.sse(event);
        return resp;
      }
    };
    getFastifyServer(handler).then((server2) => {
      const eventsource = getEventSource(server2);
      source.push({ id: "1", event: "message", data: "Something" });
      eventsource.onmessage = (evt) => {
        expect(evt.data).equal("Something");
        expect(evt.type).equal("message");
        expect(evt.lastEventId).equal("1");
        eventsource.close();
        server2.close();
        done();
      };
    });
  });

  it("should send event after headers has been sent by user", function (done) {
    const handler: RouteHandler = async (req, resp): Promise<void> => {
      resp.header("Content-Type", "text/event-stream");
      resp.raw.flushHeaders();
      resp.sse({ id: "1", event: "message", data: "Something" });
      return resp;
    };
    getFastifyServer(handler).then((server2) => {
      const eventsource = getEventSource(server2);
      eventsource.onmessage = (evt) => {
        expect(evt.data).equal("Something");
        expect(evt.type).equal("message");
        expect(evt.lastEventId).equal("1");
        eventsource.close();
        server2.close();
        done();
      };
    });
  });

  it("should send multiple events", function (done) {
    const eventsource = getEventSource(server);
    source.push({ id: "1", event: "message", data: "Something" });
    source.push({ id: "2", event: "message", data: "Something" });
    source.end();
    const spy = sinon.spy();
    eventsource.onmessage = () => spy();
    eventsource.onerror = () => {
      expect(spy.callCount).to.be.equal(2);
      eventsource.close();
      done();
    };
  });
});
