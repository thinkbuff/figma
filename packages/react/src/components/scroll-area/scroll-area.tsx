import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '~/utils';

const ScrollBar: React.FC<React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>> = ({
  className,
  orientation = 'vertical',
  ref,
  ...props
}) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-1.5 border-l border-l-transparent p-px',
      orientation === 'horizontal' && 'h-1.5 border-t border-t-transparent p-px',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-grow rounded-full bg-figma-text-secondary" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

/**
 * Augments native scroll functionality for custom, cross-browser styling.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/scroll-area)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/scroll-area#api-reference)
 */
const ScrollArea: React.FC<React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>> = ({
  className,
  children,
  ref,
  ...props
}) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] [&>div]:!block">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export { ScrollArea, ScrollBar };
