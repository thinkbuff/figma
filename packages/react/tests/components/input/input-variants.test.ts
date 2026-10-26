import { describe, expect, it } from 'vitest';

import { inputVariants } from '~/components/input/input-variants';

describe('inputVariants', () => {
  it('applies the default variant', () => {
    expect(inputVariants()).toMatchInlineSnapshot(
      `"w-full text-figma-sm leading-figma-sm text-figma fill-figma-icon cursor-default bg-figma-secondary bg-clip-border outline-solid outline-1 -outline-offset-1 outline-transparent rounded-figma-md placeholder:text-figma-tertiary focus:outline-figma-border-selected not-disabled:not-focus:hover:outline-figma-border"`,
    );
  });

  it('applies the border variant', () => {
    expect(inputVariants({ variant: 'border' })).toMatchInlineSnapshot(
      `"w-full text-figma-sm leading-figma-sm text-figma fill-figma-icon cursor-default bg-figma-secondary bg-clip-border outline-solid outline-1 -outline-offset-1 outline-transparent rounded-figma-md placeholder:text-figma-tertiary focus:outline-figma-border-selected outline-figma-border"`,
    );
  });

  it('applies invalid and disabled states', () => {
    expect(inputVariants({ invalid: true })).toContain('outline-figma-border-danger');
    expect(inputVariants({ disabled: true })).toContain('cursor-not-allowed');
    expect(inputVariants({ disabled: true })).toContain('text-figma-disabled');
  });
});
