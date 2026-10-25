import { describe, expect, it } from 'vitest';

import { inputVariants } from './input-variants';

describe('inputVariants', () => {
  it('applies the default variant', () => {
    expect(inputVariants()).toMatchInlineSnapshot(
      `"w-full font-size-11 text-figma fill-figma-icon cursor-default bg-figma bg-clip-border border outline-solid outline-1 -outline-offset-2 outline-transparent rounded-0.5 placeholder:text-figma-tertiary focus:(border-figma-selected outline-figma-border-selected) border-transparent not-focus:hover:border-figma"`,
    );
  });

  it('applies the border variant', () => {
    expect(inputVariants({ variant: 'border' })).toMatchInlineSnapshot(
      `"w-full font-size-11 text-figma fill-figma-icon cursor-default bg-figma bg-clip-border border outline-solid outline-1 -outline-offset-2 outline-transparent rounded-0.5 placeholder:text-figma-tertiary focus:(border-figma-selected outline-figma-border-selected) border-figma"`,
    );
  });

  it('applies invalid and disabled states', () => {
    expect(inputVariants({ invalid: true })).toContain('border-figma-danger');
    expect(inputVariants({ disabled: true })).toContain('cursor-not-allowed');
    expect(inputVariants({ disabled: true })).toContain('text-figma-disabled');
  });
});
