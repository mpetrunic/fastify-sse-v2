import fastify, {EventMessage, FastifyInstance} from "fastify";
import {FastifySSEPlugin} from "../src";
import {AddressInfo} from "net";
import EventSource from "eventsource";

export async function getFastifyServer(source: AsyncIterable<EventMessage>): Promise<FastifyInstance> {
  const server = fastify();
  server.register(FastifySSEPlugin);
  server.get("/", function (req, res) {
    res.sse(source);
  });
  await new Promise((resolve, reject) => {
    server.listen(0, "127.0.0.1", (err) => {
      if(err) {
        return reject(err);
      }
      resolve();
    });
  });
  return server;
}

export function getBaseUrl(fastifyInstance: FastifyInstance): string {
  const address = fastifyInstance.server.address() as AddressInfo;
  return `http://${address.address}:${address.port}`;
}

export function getEventSource(server: FastifyInstance, path = "/"): EventSource {
  return new EventSource(`${getBaseUrl(server)}${path}`);
}
