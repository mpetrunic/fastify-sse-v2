import fastify, {EventMessage, FastifyInstance, FastifyPluginAsync, RouteHandler} from "fastify4";
import {FastifySSEPlugin} from "../../src";
import {AddressInfo} from "net";
import EventSource from "eventsource";
import {isAsyncIterable} from "../../src/util";

export async function getFastifyServer(
  source: AsyncIterable<EventMessage> | RouteHandler
): Promise<FastifyInstance> {
  const server = fastify();
  server.register(FastifySSEPlugin as any as FastifyPluginAsync);
  if(!isAsyncIterable(source)) {
    server.get("/", source);
  } else {
    server.get("/", function (req, res) {
      res.header("x-test-header2", "test2");
      res.sse(source);
    });
  }
  await server.ready();
  await new Promise<void>((resolve, reject) => {
    server.listen({port: 0, host: "127.0.0.1"}, (err) => {
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
