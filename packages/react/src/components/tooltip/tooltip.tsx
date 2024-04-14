import { forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '~/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    className={cn('fill-figma-bg-tooltip', className)}
    ref={ref}
    {...props}
  />
));

TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

type TooltipContentElement = React.ElementRef<typeof TooltipPrimitive.Content>;

interface TooltipContentProps
  extends TooltipPrimitive.PortalProps,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

const TooltipContent = forwardRef<TooltipContentElement, TooltipContentProps>(
  ({ className, container, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Portal container={container}>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'bg-figma-tooltip',
          'text-figma-tooltip',
          'fill-figma-icon-tooltip',
          'px-3',
          'rounded-0.5',
          'py-2',
          'z-50',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  ),
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps
  extends TooltipPrimitive.TooltipProps,
  Omit<TooltipContentProps, 'content'> {
  /**
   * The content of the tooltip
   */
  content: React.ReactNode;
  /**
   * The container of the tooltip
   */
  container?: TooltipPrimitive.PortalProps['container'];
  /**
   * Whether the tooltip should have an arrow
   *
   * @default true
   */
  withArrow?: boolean;
}

/**
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 * - [Docs](https://www.radix-ui.com/primitives/docs/components/tooltip)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/tooltip#api-reference)
 */
const Tooltip = ({
  // Root props,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  disableHoverableContent,
  // Tooltip Trigger
  children,
  // Tooltip Content
  content,
  withArrow = true,
  // Tooltip Content props
  ...props
}: TooltipProps) => (
  <TooltipRoot
    open={open}
    defaultOpen={defaultOpen}
    onOpenChange={onOpenChange}
    delayDuration={delayDuration}
    disableHoverableContent={disableHoverableContent}
  >
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent
      {...props}
      asChild={false}
    >
      {content}
      {withArrow ? <TooltipArrow /> : null}
    </TooltipContent>
  </TooltipRoot>
);

Tooltip.displayName = 'Tooltip';

export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
};

export type { TooltipProps };
