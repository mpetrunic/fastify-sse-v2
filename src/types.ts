export interface SsePluginOptions {
  /**
   * Update client reconnect interval (how long will client wait before trying to reconnect).
   */
  retryDelay?: false | number;

  /**
   * Set the high-water mark for the event stream (byte size that determines when the buffer is full and a 'flush' should be performed).
   * Default is 16kb.
   */
  highWaterMark?: number;
}
