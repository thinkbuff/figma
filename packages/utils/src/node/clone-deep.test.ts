import { describe, expect, it } from 'vitest';

import { cloneDeep } from './clone-deep';

describe('cloneDeep', () => {
  it('returns primitives as-is', () => {
    expect(cloneDeep(42)).toBe(42);
    expect(cloneDeep('text')).toBe('text');
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(void 0)).toBe(undefined);
  });

  it('clones objects deeply', () => {
    const source = { a: 1, nested: { b: 2, deeper: { c: 3 } } };
    const cloned = cloneDeep(source);

    expect(cloned).toEqual(source);
    expect(cloned).not.toBe(source);
    expect(cloned.nested).not.toBe(source.nested);
    expect(cloned.nested.deeper).not.toBe(source.nested.deeper);
  });

  it('clones arrays deeply', () => {
    const source = [{ a: 1 }, { b: 2 }];
    const cloned = cloneDeep(source);

    expect(cloned).toEqual(source);
    expect(cloned).not.toBe(source);
    expect(cloned[0]).not.toBe(source[0]);
  });

  it('copies Uint8Array contents into a new instance', () => {
    const source = new Uint8Array([1, 2, 3]);
    const cloned = cloneDeep(source);

    expect(cloned).toEqual(source);
    expect(cloned).not.toBe(source);

    cloned[0] = 9;
    expect(source[0]).toBe(1);
  });

  it('throws on unsupported types', () => {
    expect(() => cloneDeep(() => {})).toThrow('Unknown value type');
  });
});
