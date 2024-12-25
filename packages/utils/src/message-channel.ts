import EventEmitter from 'eventemitter3';

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

function getEventNameWithKey(type: string | symbol, key: string = '') {
  return key ? `${type.toString()}::${key}` : type;
}

export function createMessageChannel<
  MessageEvents extends Record<string, unknown> = Record<string, unknown>,
>() {
  const emitter = new EventEmitter();
  // eslint-disable-next-line unicorn/prefer-global-this
  const isInFigmaSandbox = typeof window === 'undefined';

  try {
    if (isInFigmaSandbox) {
      figma.ui.onmessage = (
        message: MessageEventObject<
          MessageEvents,
          MessageEventTypes<MessageEvents>
        >,
      ) => {
        if (!message?.type) {
          return;
        }

        emitter.emit(message.type, message);
      };
    } else {
      window.addEventListener('message', (event: MessageEvent) => {
        const message = event.data?.pluginMessage as
          | MessageEventObject<MessageEvents, MessageEventTypes<MessageEvents>>
          | undefined;

        if (!message?.type) {
          return;
        }

        const eventName = getEventNameWithKey(message.type, message.key);
        emitter.emit(eventName, message);
      });
    }
  } catch (error) {
    console.warn('[MessageChannel](addMesssageEventListener)', error);
  }

  return {
    /**
     * Registers a listener for a specific message event.
     *
     * @param type - The type of the message event.
     * @param listener - The callback function to be executed when the event is triggered.
     * @param [options] - Optional parameters for the event listener.
     * @param [options.key] - A unique identifier for the message.
     * @param [options.once] - Specifies if the listener should be executed only once.
     */
    onMessage<T extends MessageEventTypes<MessageEvents>>(
      type: T,
      listener: MessageEventListener<MessageEvents, T>,
      options: {
        /** unique id for the message */
        key?: string;
        /** Add a one-time listener for a given message. */
        once?: boolean;
      } = {},
    ) {
      const { key = '', once = false } = options;
      const eventName = getEventNameWithKey(type, key);

      if (once) {
        emitter.once(eventName, listener);
      } else {
        emitter.on(eventName, listener);
      }
    },
    /**
     * Posts a message to the Figma UI or parent window.
     *
     * @param message - The message to be posted.
     */
    postMessage<T extends MessageEventTypes<MessageEvents>>(
      message: MessageEventObject<MessageEvents, T>,
    ) {
      if (isInFigmaSandbox) {
        figma.ui.postMessage(message);
        return;
      }

      window?.parent?.postMessage?.({ pluginMessage: message }, '*');
    },
    /**
     * Removes a message listener for a specific event type and listener function.
     *
     * @param type - The type of the message event.
     * @param listener - The callback function to be removed as a listener.
     * @param [options] - Optional parameters for the event listener.
     * @param [options.key] - A unique identifier for the message.
     */
    removeMessageListener<T extends MessageEventTypes<MessageEvents>>(
      type: T,
      listener: MessageEventListener<MessageEvents, T>,
      options: {
        /** unique id for the message */
        key?: string;
      } = {},
    ) {
      const { key = '' } = options;
      const eventName = getEventNameWithKey(type, key);
      emitter.off(eventName, listener);
    },
    /**
     * Removes all listeners for a specific message event type, or all listeners if no type is provided.
     *
     * @param type - The type of the message event. If not provided, all listeners will be removed.
     */
    removeAllMessageListeners<T extends MessageEventTypes<MessageEvents>>(
      type?: T,
    ) {
      emitter.removeAllListeners(type);
    },
  };
}
