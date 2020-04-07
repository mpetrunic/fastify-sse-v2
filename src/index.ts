import fastifyPlugin from "fastify-plugin";
import {plugin} from "./plugin";

export const FastifySSEPlugin = fastifyPlugin(plugin, {
  name: "fastify-sse-v2",
  fastify: "2.x",
});