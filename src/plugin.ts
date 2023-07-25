import { EventMessage, FastifyPluginAsync, FastifyReply } from "fastify";
import toStream from "it-to-stream";
import pushable from "it-pushable";
import { SsePluginOptions } from "./types";
import { serializeSSEEvent, transformAsyncIterable } from "./sse";
import { isAsyncIterable } from "./util";

// eslint-disable-next-line @typescript-eslint/require-await
export const plugin: FastifyPluginAsync<SsePluginOptions> = async function (
  instance,
  options
): Promise<void> {
  instance.decorateReply(
    "sse",
    function (
      this: FastifyReply,
      source: AsyncIterable<EventMessage> | EventMessage
    ): void {
      //if this already set, it's not first event
      if (!this.raw.headersSent) {
        this.sseContext = { source: pushable<EventMessage>() };
        Object.entries(this.getHeaders()).forEach(([key, value]) => {
          this.raw.setHeader(key, value ?? "");
        });
        this.raw.setHeader("Content-Type", "text/event-stream; charset=utf-8");
        this.raw.setHeader("Connection", "keep-alive");
        this.raw.setHeader("Cache-Control", "no-cache,no-transform");
        this.raw.setHeader("x-no-compression", 1);
        this.raw.write(
          serializeSSEEvent({ retry: options.retryDelay || 3000 })
        );
        handleAsyncIterable(this, this.sseContext.source);
      }
      if (isAsyncIterable(source)) {
        return handleAsyncIterable(this, source);
      } else {
        if (!this.sseContext?.source) {
          this.sseContext = { source: pushable<EventMessage>() };
          handleAsyncIterable(this, this.sseContext.source);
        }
        this.sseContext.source.push(source);
        return;
      }
    }
  );
};

function handleAsyncIterable(
  reply: FastifyReply,
  source: AsyncIterable<EventMessage>
): void {
  toStream(transformAsyncIterable(source)).pipe(reply.raw);
}
