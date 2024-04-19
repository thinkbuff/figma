import type EventEmitter from 'eventemitter3';

export type MessageEventTypes<T extends Record<string, unknown>> =
  EventEmitter.EventNames<T>;

export type MessageEventObject<
  T extends Record<string, unknown>,
  K extends MessageEventTypes<T>,
> = T[K] extends undefined
  ? {
      /** unique message id */
      key?: string;
      /** message event type  */
      type: K;
    }
  : {
      /** unique message id */
      key?: string;
      /** message event type  */
      type: K;
      /** message event data */
      data: T[K];
    };

export type MessageEventListener<
  T extends Record<string, unknown>,
  K extends MessageEventTypes<T>,
> = (message: MessageEventObject<T, K>) => void;
