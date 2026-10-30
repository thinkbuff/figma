import { describe, expect, it } from 'vitest';

import { buttonVariants } from '~/components/button/button-variants';

describe('buttonVariants', () => {
  it('applies the default variant', () => {
    const classes = buttonVariants();
    expect(classes).toContain('bg-figma-brand');
    expect(classes).toContain('text-figma-onbrand');
    expect(classes).toContain('h-6');
    expect(classes).toContain('px-2');
  });

  it('applies per-variant classes', () => {
    expect(buttonVariants({ variant: 'secondary' })).toContain('outline-figma-bordertranslucent');
    expect(buttonVariants({ variant: 'destructive' })).toContain('bg-figma-danger');
    expect(buttonVariants({ variant: 'secondary-destructive' })).toContain(
      'outline-figma-border-danger',
    );
    expect(buttonVariants({ variant: 'inverse' })).toContain('bg-figma-inverse');
    expect(buttonVariants({ variant: 'success' })).toContain('bg-figma-success');
    expect(buttonVariants({ variant: 'figjam' })).toContain('bg-figma-figjam');
    expect(buttonVariants({ variant: 'link' })).toContain('text-figma-brand');
    expect(buttonVariants({ variant: 'link-danger' })).toContain('text-figma-danger');
    const ghost = buttonVariants({ variant: 'ghost' });
    expect(ghost).toContain('hover:bg-figma-bgtransparent-secondary-hover');
    expect(ghost).toContain('active:bg-figma-bgtransparent-secondary-pressed');
  });

  it('applies the focus ring only to filled variants via shadow-figma-focus-inset', () => {
    for (const variant of ['primary', 'destructive', 'success', 'figjam', 'inverse'] as const) {
      expect(buttonVariants({ variant })).toContain('shadow-figma-focus-inset');
    }
    for (const variant of ['secondary', 'ghost', 'link'] as const) {
      expect(buttonVariants({ variant })).not.toContain('shadow-figma-focus-inset');
    }
  });

  it('applies icon lead padding and sizes', () => {
    expect(buttonVariants({ icon: true })).toContain('pl-1');
    expect(buttonVariants({ icon: true, size: 'large' })).toContain('pl-1');
    expect(buttonVariants({ size: 'large' })).toContain('h-8');
    expect(buttonVariants({ size: 'wide' })).toContain('w-full');
  });
});
