import fastifyPlugin from "fastify-plugin";
import { Pushable } from "it-pushable";
import { plugin } from "./plugin";

export const FastifySSEPlugin = fastifyPlugin(plugin, {
  name: "fastify-sse-v2",
  fastify: ">=3",
});

export default FastifySSEPlugin;

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

  interface FastifyReply {
    sseContext: { source: Pushable<EventMessage> };
    sse(source: AsyncIterable<EventMessage> | EventMessage): void;
  }
}

//seems like fastify removed EventMessage in recent release so this is replacement for that
export interface EventMessage {
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
