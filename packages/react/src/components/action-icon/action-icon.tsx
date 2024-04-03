import { forwardRef } from 'react';

import { cn } from '../../utils';

interface ActionIconProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> {}

const ActionIcon = forwardRef<React.ElementRef<'button'>, ActionIconProps>(({ className, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn([
        'size-8',
        'text-size-11',
        'flex',
        'justify-center',
        'items-center',
        'rounded-0.5',
        'cursor-default',
        'appearance-none',
        'text-figma-icon',
        'fill-figma-icon',
        'bg-transparent',
        'bg-clip-border',
        'outline',
        'outline-2',
        '-outline-offset-2',
        'outline-transparent',
        'transition-colors',
        disabled
          ? [
              'cursor-not-allowed',
              'text-figma-disabled',
              'fill-figma-icon-disabled',
            ]
          : [
              'hover:(bg-figma-hover text-figma-icon-hover fill-figma-icon-hover)',
              'focus:outline-figma-border-selected',
              'focus-visible:outline-figma-border-selected',
              'data-[state=open]:(bg-figma-brand text-figma-icon-onbrand fill-figma-icon-onbrand)',
              'data-[state=open]:hover:(bg-figma-brand text-figma-icon-onbrand fill-figma-icon-onbrand)',
              'data-[state=open]:focus:outline-figma-border-brand-strong',
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
