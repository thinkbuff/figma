import { describe, expect, it } from 'vitest';

import { buttonVariants } from './button-variants';

describe('buttonVariants', () => {
  it('applies the default variant', () => {
    expect(buttonVariants()).toMatchInlineSnapshot(
      `"h-8 px-3 inline-flex items-center justify-center shrink-0 rounded-1.5 font-size-11 truncate font-medium border-none cursor-default transition-colors outline-solid outline-1 -outline-offset-1 outline-transparent bg-transparent bg-clip-border not-disabled:focus-visible:(outline-2 -outline-offset-2) disabled:cursor-not-allowed focus:not-focus-visible:(outline-0 outline-transparent) disabled:(text-figma-ondisabled bg-figma-disabled) disabled:hover:bg-figma-disabled disabled:active:(bg-figma-disabled outline-transparent) disabled:focus-visible:outline-transparent btn-primary text-figma-onbrand bg-figma-brand hover:bg-figma-brand-hover active:bg-figma-brand-pressed focus-visible:outline-figma-border-brand-strong data-[state=open]:bg-figma-brand-pressed"`,
    );
  });

  it('applies variant and color combinations', () => {
    expect(buttonVariants({ variant: 'outline', color: 'danger' })).toMatchInlineSnapshot(
      `"h-8 px-3 inline-flex items-center justify-center shrink-0 rounded-1.5 font-size-11 truncate font-medium border-none cursor-default transition-colors outline-solid outline-1 -outline-offset-1 outline-transparent bg-transparent bg-clip-border not-disabled:focus-visible:(outline-2 -outline-offset-2) disabled:cursor-not-allowed disabled:(text-figma-disabled bg-transparent outline-figma-text-disabled) disabled:hover:bg-transparent disabled:active:bg-transparent btn-danger text-figma-danger outline-figma-text-danger hover:bg-figma-danger-tertiary active:bg-figma-danger-tertiary focus-visible:outline-figma-border-danger-strong data-[state=open]:bg-figma-danger-tertiary"`,
    );
    expect(buttonVariants({ variant: 'link', color: 'secondary' })).toMatchInlineSnapshot(
      `"h-8 px-3 inline-flex items-center justify-center shrink-0 rounded-1.5 font-size-11 truncate font-medium border-none cursor-default transition-colors outline-solid outline-1 -outline-offset-1 outline-transparent bg-transparent bg-clip-border not-disabled:focus-visible:(outline-2 -outline-offset-2) disabled:cursor-not-allowed hover:underline disabled:(text-figma-disabled no-underline) btn-secondary text-figma"`,
    );
  });

  it('appends extra className', () => {
    expect(buttonVariants({ className: 'extra' })).toContain('extra');
  });
});
