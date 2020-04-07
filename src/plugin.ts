import fastify from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";

export const plugin: fastify.Plugin<Server, IncomingMessage, ServerResponse, unknown> = function (instance): void {

};