import {EventMessage, FastifyReply, Plugin} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";
import {SsePluginOptions} from "./types";
import {serializeSSEEvent, transformAsyncIterable} from "./sse";
import toStream from "it-to-stream";

export const plugin: Plugin<Server, IncomingMessage, ServerResponse, SsePluginOptions> =
    async function (instance, options): Promise<void> {
      instance.decorateReply(
        "sse",
        function (this: FastifyReply<ServerResponse>, source: AsyncIterable<EventMessage>): void {
          this.res.setHeader("Content-Type","text/event-stream");
          this.res.setHeader("Connection", "keep-alive");
          this.res.setHeader("Cache-Control", "no-cache,no-transform");
          this.res.setHeader("x-no-compression", 1);
          this.res.write(serializeSSEEvent({retry: options.retryDelay || 3000}));
          toStream(transformAsyncIterable(source)).pipe(this.res);
        });
    };
