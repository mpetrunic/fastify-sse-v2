import {EventMessage, FastifyReply, Plugin} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";
import {SsePluginOptions} from "./types";
import {getOutputStream, serializeSSEEvent, transformAsyncIterable} from "./sse";
import toStream from "it-to-stream";

export const plugin: Plugin<Server, IncomingMessage, ServerResponse, SsePluginOptions> =
    async function (instance, options): Promise<void> {
      instance.decorateReply( 
        "sse",
        function (this: FastifyReply<ServerResponse>, source: AsyncIterable<EventMessage>): void {
          const outputStream = getOutputStream();
          outputStream.push(serializeSSEEvent({retry: options.retryDelay || 3000}));
          this.type("text/event-stream")
            .header("Connection", "keep-alive")
            .header("Cache-Control", "no-cache")
            .send(outputStream);
          toStream(transformAsyncIterable(source)).pipe(outputStream);
        });
    };