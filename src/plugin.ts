import {EventMessage, FastifyReply, Plugin} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";
import {SsePluginOptions} from "./types";
import {getOutputStream, serializeSSEEvent, transformAsyncIterable} from "./sse";
import toStream from "it-to-stream";
import AbortController from "abort-controller";

export const plugin: Plugin<Server, IncomingMessage, ServerResponse, SsePluginOptions> =
    async function (instance, options): Promise<void> {
      instance.decorateReply(
        "sse",
        function (this: FastifyReply<ServerResponse>, source: AsyncIterable<EventMessage>): AbortSignal {
          const outputStream = getOutputStream();
          outputStream.push(serializeSSEEvent({retry: options.retryDelay || 3000}));
          this.type("text/event-stream")
            .header("Connection", "keep-alive")
            .header("Cache-Control", "no-cache")
            .send(outputStream);
          const controller = new AbortController();
          this.request.req.on("close", function () {
            controller.abort();
          });
          this.request.req.on("end", function () {
            controller.abort();
          });
          this.request.req.on("error", function () {
            controller.abort();
          });
          toStream(transformAsyncIterable(source)).pipe(outputStream);
          return controller.signal;
        });
    };
