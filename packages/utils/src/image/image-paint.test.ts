import { afterEach, describe, expect, it, vi } from 'vitest';

import { createImagePaint, getImagePaintFromCache } from './image-paint';

function stubFigma() {
  const createImageAsync = vi.fn<(url: string) => Promise<{ hash: string }>>(async () => ({
    hash: 'hash-async',
  }));
  const createImage = vi.fn<(bytes: Uint8Array) => { hash: string }>(() => ({
    hash: 'hash-bytes',
  }));
  vi.stubGlobal('figma', { createImageAsync, createImage });
  return { createImageAsync, createImage };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('createImagePaint', () => {
  it('creates an IMAGE paint from a url', async () => {
    const { createImageAsync } = stubFigma();

    const paint = await createImagePaint({ key: 'url-paint', url: 'https://example.com/a.png' });

    expect(createImageAsync).toHaveBeenCalledWith('https://example.com/a.png');
    expect(paint).toMatchObject({
      type: 'IMAGE',
      scaleMode: 'FILL',
      imageHash: 'hash-async',
      scalingFactor: 0.5,
    });
  });

  it('creates an IMAGE paint from bytes', async () => {
    const { createImage } = stubFigma();
    const bytes = new Uint8Array([1, 2, 3]);

    const paint = await createImagePaint({ key: 'bytes-paint', bytes });

    expect(createImage).toHaveBeenCalledWith(bytes);
    expect(paint.imageHash).toBe('hash-bytes');
  });

  it('throws when neither url nor bytes are provided', async () => {
    stubFigma();

    await expect(createImagePaint({ key: 'empty-paint' })).rejects.toThrow(
      'Either url or bytes must be provided',
    );
  });

  it('lets options override paint defaults', async () => {
    stubFigma();

    const paint = await createImagePaint({
      key: 'options-paint',
      url: 'https://example.com/a.png',
      options: { scaleMode: 'FIT', scalingFactor: 1 },
    });

    expect(paint).toMatchObject({ scaleMode: 'FIT', scalingFactor: 1 });
  });

  it('caches paints by key and returns the cached instance', async () => {
    const { createImageAsync } = stubFigma();

    const first = await createImagePaint({ key: 'cached-paint', url: 'https://example.com/a.png' });
    const second = await createImagePaint({
      key: 'cached-paint',
      url: 'https://example.com/other.png',
    });

    expect(second).toBe(first);
    expect(createImageAsync).toHaveBeenCalledOnce();
    expect(getImagePaintFromCache('cached-paint')).toBe(first);
  });
});
