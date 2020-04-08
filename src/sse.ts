import {PassThrough, Transform} from "stream";
import {EventMessage} from "fastify";

export function getOutputStream(): Transform {
  return new PassThrough({
    write: transformEventStream,
    transform: transformEventStream,
    flush(callback: (error?: (Error | null), data?: unknown) => void): void {
      callback(null, serializeSSEEvent({event: "end", data: "Stream closed"}));
    }
  });
}

export function transformEventStream(
  chunk: EventMessage, encoding: string, callback: (error?: (Error | null), data?: string) => void
): void {
  try {
    callback(null, serializeSSEEvent(chunk));
  } catch (e) {
    callback(e);
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