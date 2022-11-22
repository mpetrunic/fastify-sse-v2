export function isAsyncIterable<T extends AsyncIterable<unknown>>(
  source: T | unknown
): source is T {
  if (source === null || source === undefined || typeof source !== "object") {
    return false;
  }
  return Symbol.asyncIterator in source;
}
