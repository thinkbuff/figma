import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createMessageChannel } from '../src/message-channel';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type AnyMessage = { type: string; key?: string; data?: unknown };

function makeBrowserEnv() {
  let capturedListener: ((event: { data: unknown }) => void) | null = null;
  const parentPostMessage = vi.fn<() => void>();

  vi.stubGlobal('window', {
    addEventListener: (_event: string, listener: typeof capturedListener) => {
      capturedListener = listener;
    },
    parent: { postMessage: parentPostMessage },
  });

  function dispatch(message: AnyMessage) {
    capturedListener?.({ data: { pluginMessage: message } });
  }

  function dispatchRaw(eventData: unknown) {
    capturedListener?.({ data: eventData });
  }

  return { parentPostMessage, dispatch, dispatchRaw };
}

function makeSandboxEnv() {
  vi.stubGlobal('window', void 0);

  const figmaUi: {
    onmessage: ((msg: AnyMessage) => void) | null;
    postMessage: ReturnType<typeof vi.fn>;
  } = {
    onmessage: null,
    postMessage: vi.fn<() => void>(),
  };
  vi.stubGlobal('figma', { ui: figmaUi });

  function dispatch(message: AnyMessage) {
    figmaUi.onmessage?.(message);
  }

  return { figmaUi, dispatch };
}

// ---------------------------------------------------------------------------
// Browser receive path (key routing)
// ---------------------------------------------------------------------------

describe('browser receive path', () => {
  let dispatch: (msg: AnyMessage) => void;
  let dispatchRaw: (eventData: unknown) => void;

  beforeEach(() => {
    ({ dispatch, dispatchRaw } = makeBrowserEnv());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('routes message with key only to the matching keyed handler, not to unkeyed handler', () => {
    const channel = createMessageChannel();
    const keyedHandler = vi.fn<() => void>();
    const unkeyedHandler = vi.fn<() => void>();

    channel.onMessage('ping', unkeyedHandler);
    channel.onMessage('ping', keyedHandler, { key: 'foo' });

    dispatch({ type: 'ping', key: 'foo' });

    expect(keyedHandler).toHaveBeenCalledOnce();
    expect(unkeyedHandler).not.toHaveBeenCalled();
  });

  it('routes message without key only to unkeyed handler, not to keyed handler', () => {
    const channel = createMessageChannel();
    const keyedHandler = vi.fn<() => void>();
    const unkeyedHandler = vi.fn<() => void>();

    channel.onMessage('ping', unkeyedHandler);
    channel.onMessage('ping', keyedHandler, { key: 'foo' });

    dispatch({ type: 'ping' });

    expect(unkeyedHandler).toHaveBeenCalledOnce();
    expect(keyedHandler).not.toHaveBeenCalled();
  });

  it('two concurrent keyed requests do not crosstalk', () => {
    const channel = createMessageChannel();
    const handlerA = vi.fn<() => void>();
    const handlerB = vi.fn<() => void>();

    channel.onMessage('query', handlerA, { key: 'req-1' });
    channel.onMessage('query', handlerB, { key: 'req-2' });

    dispatch({ type: 'query', key: 'req-1' });

    expect(handlerA).toHaveBeenCalledOnce();
    expect(handlerB).not.toHaveBeenCalled();

    dispatch({ type: 'query', key: 'req-2' });

    expect(handlerA).toHaveBeenCalledOnce();
    expect(handlerB).toHaveBeenCalledOnce();
  });

  it('{ once: true, key } fires once then auto-removes', () => {
    const channel = createMessageChannel();
    const handler = vi.fn<() => void>();

    channel.onMessage('ping', handler, { once: true, key: 'foo' });

    dispatch({ type: 'ping', key: 'foo' });
    dispatch({ type: 'ping', key: 'foo' });

    expect(handler).toHaveBeenCalledOnce();
  });

  it('removeMessageListener with key removes only that keyed handler', () => {
    const channel = createMessageChannel();
    const keyedHandler = vi.fn<() => void>();
    const unkeyedHandler = vi.fn<() => void>();

    channel.onMessage('ping', unkeyedHandler);
    channel.onMessage('ping', keyedHandler, { key: 'foo' });

    channel.removeMessageListener('ping', keyedHandler, { key: 'foo' });

    dispatch({ type: 'ping', key: 'foo' });
    dispatch({ type: 'ping' });

    expect(keyedHandler).not.toHaveBeenCalled();
    expect(unkeyedHandler).toHaveBeenCalledOnce();
  });

  it('ignores messages without a pluginMessage or type', () => {
    const channel = createMessageChannel();
    const handler = vi.fn<() => void>();

    channel.onMessage('ping', handler);

    dispatchRaw({});
    dispatchRaw(null);
    dispatchRaw({ pluginMessage: { data: 'no type field' } });
    dispatch({} as AnyMessage);

    expect(handler).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Browser send path
// ---------------------------------------------------------------------------

describe('browser send path', () => {
  let parentPostMessage: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    ({ parentPostMessage } = makeBrowserEnv());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls parent.postMessage with { pluginMessage } wrapper and "*" origin', () => {
    const channel = createMessageChannel();
    const msg: AnyMessage = { type: 'hello', data: { value: 42 } };

    channel.postMessage(msg as never);

    expect(parentPostMessage).toHaveBeenCalledOnce();
    expect(parentPostMessage).toHaveBeenCalledWith({ pluginMessage: msg }, '*');
  });
});

// ---------------------------------------------------------------------------
// Sandbox receive path
// ---------------------------------------------------------------------------

describe('sandbox receive path', () => {
  let dispatch: (msg: AnyMessage) => void;

  beforeEach(() => {
    ({ dispatch } = makeSandboxEnv());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('dispatches by type only; handler receives full message including key', () => {
    const channel = createMessageChannel();
    const handler = vi.fn<() => void>();

    channel.onMessage('ping', handler);

    const msg: AnyMessage = { type: 'ping', key: 'some-key' };
    dispatch(msg);

    expect(handler).toHaveBeenCalledOnce();
    expect(handler).toHaveBeenCalledWith(msg);
  });

  it('multiple handlers on the same type all fire', () => {
    const channel = createMessageChannel();
    const h1 = vi.fn<() => void>();
    const h2 = vi.fn<() => void>();

    channel.onMessage('ping', h1);
    channel.onMessage('ping', h2);

    dispatch({ type: 'ping' });

    expect(h1).toHaveBeenCalledOnce();
    expect(h2).toHaveBeenCalledOnce();
  });

  it('once option fires the handler once then auto-removes', () => {
    const channel = createMessageChannel();
    const handler = vi.fn<() => void>();

    channel.onMessage('ping', handler, { once: true });

    dispatch({ type: 'ping' });
    dispatch({ type: 'ping' });

    expect(handler).toHaveBeenCalledOnce();
  });

  it('silently ignores invalid messages (null, undefined, missing type)', () => {
    const channel = createMessageChannel();
    const handler = vi.fn<() => void>();
    channel.onMessage('ping', handler);

    dispatch(null as unknown as AnyMessage);
    dispatch(undefined as unknown as AnyMessage);
    dispatch({ data: 'no type field' } as AnyMessage);
    dispatch({} as AnyMessage);

    expect(handler).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Sandbox send path
// ---------------------------------------------------------------------------

describe('sandbox send path', () => {
  let figmaUi: {
    onmessage: ((msg: AnyMessage) => void) | null;
    postMessage: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    ({ figmaUi } = makeSandboxEnv());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls figma.ui.postMessage with the message object', () => {
    const channel = createMessageChannel();
    const msg: AnyMessage = { type: 'hello' };

    channel.postMessage(msg as never);

    expect(figmaUi.postMessage).toHaveBeenCalledOnce();
    expect(figmaUi.postMessage).toHaveBeenCalledWith(msg);
  });

  it('passes message object through unmodified', () => {
    const channel = createMessageChannel();
    const msg: AnyMessage = { type: 'update', key: 'k1', data: { count: 3 } };

    channel.postMessage(msg as never);

    expect(figmaUi.postMessage).toHaveBeenCalledWith(msg);
    expect(figmaUi.postMessage.mock.calls[0]![0]).toBe(msg);
  });
});

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

describe('lifecycle', () => {
  let dispatch: (msg: AnyMessage) => void;

  beforeEach(() => {
    ({ dispatch } = makeBrowserEnv());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('removeAllMessageListeners() clears all handlers', () => {
    const channel = createMessageChannel();
    const h1 = vi.fn<() => void>();
    const h2 = vi.fn<() => void>();

    channel.onMessage('ping', h1);
    channel.onMessage('pong', h2);

    channel.removeAllMessageListeners();

    dispatch({ type: 'ping' });
    dispatch({ type: 'pong' });

    expect(h1).not.toHaveBeenCalled();
    expect(h2).not.toHaveBeenCalled();
  });

  it("removeAllMessageListeners(type) clears only that type's handlers", () => {
    const channel = createMessageChannel();
    const h1 = vi.fn<() => void>();
    const h2 = vi.fn<() => void>();

    channel.onMessage('ping', h1);
    channel.onMessage('pong', h2);

    channel.removeAllMessageListeners('ping');

    dispatch({ type: 'ping' });
    dispatch({ type: 'pong' });

    expect(h1).not.toHaveBeenCalled();
    expect(h2).toHaveBeenCalledOnce();
  });
});
