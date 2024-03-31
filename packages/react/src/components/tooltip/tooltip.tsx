import { forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../../utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  TooltipPrimitive.PopperArrowProps
>((props, ref) => (
  <TooltipPrimitive.Arrow
    className="fill-figma-bg-tooltip"
    ref={ref}
    {...props}
  />
));

TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

type TooltipContentElement = React.ElementRef<typeof TooltipPrimitive.Content>;

interface TooltipContentProps extends TooltipPrimitive.PopperContentProps, TooltipPrimitive.PortalProps {}

/**
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 * - [Docs](https://www.radix-ui.com/primitives/docs/components/tooltip)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/tooltip#api-reference)
 */
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
            'py-2.5',
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

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow };
