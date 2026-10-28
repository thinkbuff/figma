import { describe, expect, it } from 'vitest';

import { buttonVariants } from '~/components/button/button-variants';

describe('buttonVariants', () => {
  it('applies the default variant', () => {
    expect(buttonVariants()).toMatchInlineSnapshot(
      `"inline-flex items-center justify-center shrink-0 select-none appearance-none rounded-figma-md text-figma-body-medium truncate font-figma-default border-none cursor-default transition-colors outline-solid outline-1 -outline-offset-1 outline-transparent bg-transparent bg-clip-border focus:not-focus-visible:outline-0 focus:not-focus-visible:outline-transparent disabled:text-figma-ondisabled disabled:bg-figma-disabled disabled:active:bg-figma-disabled disabled:active:outline-transparent disabled:focus-visible:shadow-none disabled:focus-visible:outline-transparent btn-primary h-6 px-2 w-fit text-figma-onbrand bg-figma-brand active:bg-figma-brand-pressed focus-visible:outline-figma-border-onbrand-strong focus-visible:shadow-[0_0_0_1px_var(--figma-color-border-selected-strong)] aria-expanded:bg-figma-brand-pressed"`,
    );
  });

  it('applies variant and color combinations', () => {
    expect(buttonVariants({ variant: 'outline', color: 'danger' })).toMatchInlineSnapshot(
      `"inline-flex items-center justify-center shrink-0 select-none appearance-none rounded-figma-md text-figma-body-medium truncate font-figma-default border-none cursor-default transition-colors outline-solid outline-1 -outline-offset-1 outline-transparent bg-transparent bg-clip-border disabled:text-figma-disabled disabled:bg-transparent disabled:outline-figma-border-disabled disabled:active:bg-transparent btn-danger h-6 px-2 w-fit text-figma-danger outline-figma-text-danger hover:bg-figma-danger-tertiary active:bg-figma-danger-tertiary focus-visible:outline-figma-border-danger-strong aria-expanded:bg-figma-danger-tertiary"`,
    );
    expect(buttonVariants({ variant: 'link', color: 'secondary' })).toMatchInlineSnapshot(
      `"inline-flex items-center justify-center shrink-0 select-none appearance-none rounded-figma-md text-figma-body-medium truncate font-figma-default border-none cursor-default transition-colors outline-solid outline-1 -outline-offset-1 outline-transparent bg-transparent bg-clip-border hover:underline disabled:text-figma-disabled disabled:no-underline btn-secondary h-6 px-2 w-fit text-figma"`,
    );
  });

  it('appends extra className', () => {
    expect(buttonVariants({ className: 'extra' })).toContain('extra');
  });
});
