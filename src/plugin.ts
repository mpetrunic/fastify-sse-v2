import {EventMessage, FastifyPluginAsync, FastifyReply} from "fastify";
import {SsePluginOptions} from "./types";
import {serializeSSEEvent, transformAsyncIterable} from "./sse";
import toStream from "it-to-stream";

export const plugin: FastifyPluginAsync<SsePluginOptions> =
    async function (instance, options): Promise<void> {
      instance.decorateReply(
        "sse",
        function (this: FastifyReply, source: AsyncIterable<EventMessage>): void {
          Object.entries(this.getHeaders()).forEach(([key, value]) => {
            this.raw.setHeader(key, value);
          });
          this.raw.setHeader("Content-Type","text/event-stream");
          this.raw.setHeader("Connection", "keep-alive");
          this.raw.setHeader("Cache-Control", "no-cache,no-transform");
          this.raw.setHeader("x-no-compression", 1);
          this.raw.write(serializeSSEEvent({retry: options.retryDelay || 3000}));
          toStream(transformAsyncIterable(source)).pipe(this.raw);
        });
    };
