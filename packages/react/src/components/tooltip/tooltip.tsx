import { forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../../utils';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = forwardRef<React.ElementRef<typeof TooltipPrimitive.Arrow>, TooltipPrimitive.PopperArrowProps>(
  (props, ref) => (
    <TooltipPrimitive.Arrow
      className="fill-figma-bg-tooltip"
      ref={ref}
      {...props}
    />
  ),
);

TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

type TooltipContentElement = React.ElementRef<typeof TooltipPrimitive.Content>;

interface TooltipContentProps extends TooltipPrimitive.PortalProps, TooltipPrimitive.PopperContentProps {}

const TooltipContent = forwardRef<TooltipContentElement, TooltipContentProps>(
  ({ className, container = document.body, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Portal container={container}>
      <TooltipPrimitive.Content
        className={cn(
          [
            'bg-figma-tooltip',
            'text-figma-tooltip',
            'fill-figma-icon-tooltip',
            'px-3',
            'rounded-0.5',
            'py-2',
            'z-50',
          ],
          className,
        )}
        {...props}
        sideOffset={sideOffset}
        ref={ref}
      />
    </TooltipPrimitive.Portal>
  ),
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps extends TooltipPrimitive.TooltipProps, Omit<TooltipPrimitive.PopperContentProps, 'content'> {
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
const Tooltip = forwardRef<TooltipContentElement, TooltipProps>(
  (
    {
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
    },
    ref,
  ) => (
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
        ref={ref}
      >
        {content}
        {withArrow ? <TooltipArrow /> : null}
      </TooltipContent>
    </TooltipRoot>
  ),
);

Tooltip.displayName = 'Tooltip';

export { TooltipProvider, TooltipRoot, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow };
