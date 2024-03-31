import { forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../../utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>((props, ref) => (
  <TooltipPrimitive.Arrow
    className="fill-figma-bg-tooltip"
    ref={ref}
    {...props}
  />
));

TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

type TooltipContentElement = typeof TooltipPrimitive.Content;

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<TooltipContentElement>,
  TooltipPrimitive.PortalProps {}

/**
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 * - [Docs](https://www.radix-ui.com/primitives/docs/components/tooltip)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/tooltip#api-reference)
 */
const TooltipContent = forwardRef<React.ElementRef<TooltipContentElement>, TooltipContentProps>(
  ({ className, container = document.body, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Portal container={container}>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          [
            'bg-figma-tooltip',
            'text-figma-tooltip',
            'fill-figma-icon-tooltip',
            'z-50',
            'rounded-0.5',
            'px-3',
            'py-2.5',
          ],
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  ),
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow };
