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
          this.res.write(serializeSSEEvent({retry: options.retryDelay || 3000}));
          this.type("text/event-stream")
            .header("Connection", "keep-alive")
            .header("Cache-Control", "no-cache");
          toStream(transformAsyncIterable(source)).pipe(this.res);
        });
    };
