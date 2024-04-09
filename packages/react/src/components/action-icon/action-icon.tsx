import { forwardRef } from 'react';

import { cn } from '../../utils';

interface ActionIconProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> {}

const ActionIcon = forwardRef<React.ElementRef<'button'>, ActionIconProps>(({ className, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn([
        'size-8',
        'font-size-11',
        'flex',
        'justify-center',
        'items-center',
        'shrink-0',
        'rounded-0.5',
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
        'focus:not-focus-visible:(outline-0 outline-transparent)',
        disabled
          ? [
              'cursor-not-allowed',
              'text-figma-disabled',
              'fill-figma-icon-disabled',
            ]
          : [
              'hover:(bg-figma-hover text-figma-icon-hover fill-figma-icon-hover)',
              'focus-visible:(outline-2 -outline-offset-2 outline-figma-border-brand-strong)',
              'data-[state=open]:(bg-figma-brand text-figma-icon-onbrand fill-figma-icon-onbrand)',
              'data-[state=open]:hover:(bg-figma-brand text-figma-icon-onbrand fill-figma-icon-onbrand)',
            ],
        className,
      ])}
      {...props}
      disabled={disabled}
    />
  );
});

ActionIcon.displayName = 'ActionIcon';

export { ActionIcon };

export type { ActionIconProps };
