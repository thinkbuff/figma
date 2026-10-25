import { Slot } from '@radix-ui/react-slot';

import { cn } from '~/utils';

interface ActionIconProps extends Omit<React.ComponentPropsWithRef<'button'>, 'color'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * Read [Composition](https://www.radix-ui.com/primitives/docs/guides/composition) guide for more details.
   */
  asChild?: boolean;
}

const ActionIcon: React.FC<ActionIconProps> = ({
  className,
  disabled,
  asChild = false,
  ref,
  ...props
}) => {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      ref={ref}
      className={cn(
        'size-8',
        'text-figma-sm leading-figma-sm',
        'flex',
        'justify-center',
        'items-center',
        'shrink-0',
        'rounded-figma-sm',
        'cursor-default',
        'appearance-none',
        'text-figma-icon',
        'fill-figma-icon',
        'bg-transparent',
        'bg-clip-border',
        'outline-solid',
        'outline-1',
        '-outline-offset-1',
        'outline-transparent',
        'transition-colors',
        'focus:not-focus-visible:outline-0 focus:not-focus-visible:outline-transparent',
        disabled
          ? ['cursor-not-allowed', 'text-figma-disabled', 'fill-figma-icon-disabled']
          : [
              'hover:bg-figma-hover hover:text-figma-icon-hover hover:fill-figma-icon-hover',
              'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-figma-border-brand-strong',
              'data-[state=open]:bg-figma-brand data-[state=open]:text-figma-icon-onbrand data-[state=open]:fill-figma-icon-onbrand',
              'data-[state=open]:hover:bg-figma-brand data-[state=open]:hover:text-figma-icon-onbrand data-[state=open]:hover:fill-figma-icon-onbrand',
            ],
        className,
      )}
      {...props}
      disabled={disabled}
    />
  );
};

ActionIcon.displayName = 'ActionIcon';

export { ActionIcon };

export type { ActionIconProps };
