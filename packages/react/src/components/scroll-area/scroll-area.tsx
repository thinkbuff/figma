import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';

import { cn } from '~/utils';

interface ScrollBarProps extends Omit<
  React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Scrollbar>,
  'className'
> {
  className?: string;
}

function ScrollBar({ className, orientation = 'vertical', ref, ...props }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-all opacity-0 data-hovering:opacity-100 data-scrolling:opacity-100',
        orientation === 'vertical' && 'h-full w-1.5 border-l border-l-transparent p-px',
        orientation === 'horizontal' && 'h-1.5 border-t border-t-transparent p-px',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="relative grow rounded-full bg-figma-text-secondary" />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

ScrollBar.displayName = 'ScrollBar';

interface ScrollAreaProps extends Omit<
  React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>,
  'className'
> {
  className?: string;
}

/**
 * Augments native scroll functionality for custom, cross-browser styling.
 *
 * - [Docs](https://base-ui.com/react/components/scroll-area)
 * - [API Reference](https://base-ui.com/react/components/scroll-area#api)
 */
function ScrollArea({ className, children, ref, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea, ScrollBar };
export type { ScrollAreaProps, ScrollBarProps };
