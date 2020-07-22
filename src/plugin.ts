import {EventMessage, FastifyPluginAsync, FastifyReply} from "fastify";
import {SsePluginOptions} from "./types";
import {Writable} from "stream";
import {serializeSSEEvent, transformAsyncIterable} from "./sse";
import toStream from "it-to-stream";

export const plugin: FastifyPluginAsync<SsePluginOptions> =
    async function (instance, options): Promise<void> {
      instance.decorateReply(
        "sse",
        function (this: FastifyReply, source: AsyncIterable<EventMessage>): void {
          const outputStream: Writable = this.raw;
          outputStream.write(serializeSSEEvent({retry: options.retryDelay || 3000}));
          this.type("text/event-stream")
            .header("Connection", "keep-alive")
            .header("Cache-Control", "no-cache,no-transform");
          toStream(transformAsyncIterable(source)).pipe(outputStream);
        });
    };
