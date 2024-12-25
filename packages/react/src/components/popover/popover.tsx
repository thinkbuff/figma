import { forwardRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '~/utils';

const PopoverRoot = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverClose = PopoverPrimitive.Close;

const PopoverArrow = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    width={14}
    height={7}
    className={cn('text-figma-border fill-figma-bg', className)}
    {...props}
    asChild
  >
    <svg
      viewBox="0 0 24 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="2" />
      <path
        d="M24 1C18 1 18 11 12 11C6 11 6 0.999999 8.74228e-07 0.999999"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  </PopoverPrimitive.Arrow>
));

PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /**
   * Specify a container element to portal the content into.
   *
   * @default document.body
   */
  container?: PopoverPrimitive.PopoverPortalProps['container'];
}

/**
 * Displays rich content in a portal, triggered by a button.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/popover)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/popover#api-reference)
 */
const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, container, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal container={container}>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'w-auto',
        'bg-figma',
        'rounded-0.5',
        'outline-solid',
        'outline-1',
        'outline-figma-border',
        'shadow-md',
        'will-change-(transform,opacity)',
        'data-[state=open]:(animate-in fade-in zoom-in-95)',
        'data-[state=closed]:(animate-out fade-out zoom-out-95)',
        'data-[side=top]:slide-in-from-bottom-1',
        'data-[side=right]:slide-in-from-left-1',
        'data-[side=bottom]:slide-in-from-top-1',
        'data-[side=left]:slide-in-from-right-1',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export {
  PopoverRoot as Root,
  PopoverTrigger as Trigger,
  PopoverContent as Content,
  PopoverArrow as Arrow,
  PopoverAnchor as Anchor,
  PopoverClose as Close,
};
