import type { WritableDeep } from 'type-fest';

/**
 * Deep clones a value of any type.
 *
 * @param value - The value to clone.
 * @throws {Error} - If the value is of an unknown type.
 * @returns - The cloned value.
 */
export function cloneDeep<T = any>(value: T): WritableDeep<T> {
  const type = typeof value;
  if (
    value === null
    || ['undefined', 'number', 'string', 'boolean', 'symbol'].includes(type)
  ) {
    return value as WritableDeep<T>;
  }

  if (type === 'object') {
    if (Array.isArray(value)) {
      return value.map(item => cloneDeep(item)) as WritableDeep<T>;
    }

    if (value instanceof Uint8Array) {
      return new Uint8Array(value) as WritableDeep<T>;
    }

    const cloned: Record<string, any> = {};
    for (const key in value) {
      cloned[key] = cloneDeep(value[key]);
    }

    return cloned as WritableDeep<T>;
  }

  throw new Error('Unknown value type');
}
