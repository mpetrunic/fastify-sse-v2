import {PassThrough, Transform} from "stream";
import {EventMessage} from "fastify";

export function getOutputStream(): Transform {
  return new PassThrough({
    flush(callback: (error?: (Error | null), data?: unknown) => void): void {
      callback(null, serializeSSEEvent({event: "end", data: "Stream closed"}));
    }
  });
}

export function transformEventStream(
  chunk: string, encoding: string, callback: (error?: (Error | null), data?: string) => void
): void {
  try {
    callback(null, serializeSSEEvent({
      data: chunk
    }));
  } catch (e) {
    callback(e);
  }
}

export async function* transformAsyncIterable(source: AsyncIterable<EventMessage>): AsyncIterable<string> {
  for await (const message of source) {
    yield serializeSSEEvent(message);
  }
}

export function serializeSSEEvent(chunk: EventMessage): string {
  let payload = "";
  if(chunk.id) {
    payload += `id: ${chunk.id}\n`;
  }
  if(chunk.event) {
    payload += `event: ${chunk.event}\n`;
  }
  if(chunk.data) {
    payload += `data: ${chunk.data}\n`;
  }
  if(chunk.retry) {
    payload += `retry: ${chunk.retry}\n`;
  }
  if(!payload) {
    return "";
  }
  payload += "\n\n";
  return payload;
}