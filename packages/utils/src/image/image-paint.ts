import type { WritableDeep } from 'type-fest';

const imagePaints = new Map<string, WritableDeep<ImagePaint>>();

export type ImageCreateParams = {
  key: string;
  url?: string;
  bytes?: Uint8Array;
  options?: Omit<ImagePaint, 'type' | 'imageHash'>;
};

/**
 * Asynchronously creates an image using either a provided URL or bytes.
 *
 * @param params - An object containing either a URL or bytes to create the image from.
 * @param params.url - The URL to create the image from.
 * @param params.bytes - The bytes to create the image from.
 * @throws {Error} If neither a URL nor bytes are provided.
 * @return A promise that resolves to the created image.
 */
async function createImageByUrlOrBytes(params: Pick<ImageCreateParams, 'url' | 'bytes'>) {
  if (!params?.url || !params?.bytes) {
    throw new Error('Either url or bytes must be provided');
  }

  if (params.url) {
    return figma.createImageAsync(params.url);
  }

  return figma.createImage(params.bytes);
}

/**
 * Creates an image paint based on the provided parameters.
 *
 * @param params - The parameters for creating the image paint.
 * @param params.key - The key used to store and retrieve the image paint.
 * @param [params.options] - Additional options for the image paint.
 * @param [params.options.scaleMode] - The scale mode for the image paint. Defaults to 'FILL'.
 * @param [params.options.scalingFactor] - The scaling factor for the image paint. Defaults to 0.5.
 * @return A promise that resolves to the created image paint.
 */
export async function createImagePaint(params: ImageCreateParams) {
  const { key, options = {} } = params;
  if (imagePaints.has(key)) {
    return imagePaints.get(key) as WritableDeep<ImagePaint>;
  }

  const image = await createImageByUrlOrBytes(params);

  const imagePaint: WritableDeep<ImagePaint> = {
    type: 'IMAGE',
    scaleMode: 'FILL',
    imageHash: image.hash,
    scalingFactor: 0.5,
    ...options,
  };

  imagePaints.set(key, imagePaint);

  return imagePaint;
}

/**
 * Retrieves an image paint based on the provided parameters.
 *
 * @param params - The parameters for creating the image paint.
 * @return A promise that resolves to the created image paint.
 */
export function getImagePaint(params: ImageCreateParams) {
  return createImagePaint(params);
}

/**
 * Retrieves an image paint from the cache based on the provided key.
 *
 * @param key - The key used to retrieve the image paint from the cache.
 * @return The image paint associated with the provided key, or undefined if it does not exist in the cache.
 */
export function getImagePaintFromCache(key: string) {
  return imagePaints.get(key);
}
