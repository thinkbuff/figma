import { describe, expect, it } from 'vitest';

import { cn } from '~/utils/cn';

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('ignores falsy values', () => {
    expect(cn('foo', false, null, undefined, '', 'bar')).toBe('foo bar');
  });

  it('supports conditional classes', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
  });

  it('merges conflicting tailwind classes, keeping the last', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('keeps non-conflicting classes', () => {
    expect(cn('h-8', 'w-8', 'flex')).toBe('h-8 w-8 flex');
  });

  it('keeps figma text size and figma text color as separate groups', () => {
    expect(cn('text-figma-sm', 'text-figma-danger')).toBe('text-figma-sm text-figma-danger');
    expect(cn('text-figma', 'text-figma-lg')).toBe('text-figma text-figma-lg');
  });

  it('merges conflicting figma color classes, keeping the last', () => {
    expect(cn('text-figma-danger', 'text-figma-success')).toBe('text-figma-success');
    expect(cn('bg-figma-brand', 'bg-figma-danger')).toBe('bg-figma-danger');
  });

  it('merges conflicting figma text sizes, keeping the last', () => {
    expect(cn('text-figma-sm', 'text-figma-lg')).toBe('text-figma-lg');
  });

  it('merges figma font families and weights by group', () => {
    expect(cn('font-figma', 'font-figma-code')).toBe('font-figma-code');
    expect(cn('font-figma-default', 'font-figma-strong')).toBe('font-figma-strong');
  });
});

describe('cn UI3 typography', () => {
  it('treats text-figma-body-* and text-figma-heading-* as font sizes', () => {
    expect(cn('text-figma-sm', 'text-figma-heading-medium')).toBe('text-figma-heading-medium');
    expect(cn('text-figma-body-small', 'text-figma-body-large')).toBe('text-figma-body-large');
    expect(cn('text-figma-heading-small', 'text-figma-danger')).toBe(
      'text-figma-heading-small text-figma-danger',
    );
  });
});
