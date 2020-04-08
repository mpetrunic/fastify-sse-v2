import fastifyPlugin from "fastify-plugin";
import {plugin} from "./plugin";

export const FastifySSEPlugin = fastifyPlugin(plugin, {
  name: "fastify-sse-v2",
  fastify: "2.x",
});

declare module "fastify" {

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

  interface FastifyReply<HttpResponse> {
    sse(source: AsyncIterable<EventMessage>): void;
  }
}