import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';

import { addClassName } from '~/utils';

interface ScrollBarProps extends React.ComponentPropsWithRef<
  typeof ScrollAreaPrimitive.Scrollbar
> {}

function ScrollBar({ className, orientation = 'vertical', ref, ...props }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      orientation={orientation}
      className={addClassName(
        className,
        'flex touch-none select-none transition-all opacity-0 data-hovering:opacity-100 data-scrolling:opacity-100',
        orientation === 'vertical' && 'h-full w-1.5 border-l border-l-transparent p-px',
        orientation === 'horizontal' && 'h-1.5 border-t border-t-transparent p-px',
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="relative grow rounded-full bg-figma-scrollbar" />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

ScrollBar.displayName = 'ScrollBar';

interface ScrollAreaProps extends React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root> {}

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
      className={addClassName(className, 'relative overflow-hidden')}
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
