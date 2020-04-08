import {expect} from "chai";
import {FastifyInstance} from "fastify";
import {getEventSource, getFastifyServer} from "./utils";
import pushable from "it-pushable";

describe("Test SSE plugin", function () {

  let server: FastifyInstance;
  const source = pushable();
  
  beforeEach(async function () {
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
      done();
    });
  });

  it("should end client", function (done) {
    const eventsource = getEventSource(server);
    eventsource.addEventListener("open", function () {
      source.end();
    });
    eventsource.addEventListener("message", function () {
      throw "shouldn't be called";
    });
    eventsource.addEventListener("end", function (e: Event) {
      expect(e.type).to.be.equal("end");
      // @ts-ignore
      expect(e.data).to.be.equal("Stream closed");
      done();
    });
  });

});
