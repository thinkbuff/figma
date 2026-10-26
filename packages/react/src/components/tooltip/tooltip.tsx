import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import { cn } from '~/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

interface TooltipArrowProps extends Omit<
  React.ComponentPropsWithRef<typeof TooltipPrimitive.Arrow>,
  'className'
> {
  className?: string;
}

function TooltipArrow({ className, ref, ...props }: TooltipArrowProps) {
  return (
    <TooltipPrimitive.Arrow
      className={cn(
        'fill-figma-bg-tooltip',
        'data-[side=bottom]:-top-1.5 data-[side=bottom]:rotate-180',
        'data-[side=top]:-bottom-1.5',
        'data-[side=left]:right-[-10.5px] data-[side=left]:-rotate-90',
        'data-[side=right]:left-[-10.5px] data-[side=right]:rotate-90',
        className,
      )}
      ref={ref}
      render={
        <svg
          width={14}
          height={7}
          viewBox="0 0 30 10"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 30,0 15,10" />
        </svg>
      }
      {...props}
    />
  );
}

TooltipArrow.displayName = 'TooltipArrow';

type PositionerProps = React.ComponentPropsWithRef<typeof TooltipPrimitive.Positioner>;

interface TooltipContentProps extends Omit<
  React.ComponentPropsWithRef<typeof TooltipPrimitive.Popup>,
  'className'
> {
  className?: string;
  container?: React.ComponentProps<typeof TooltipPrimitive.Portal>['container'];
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: PositionerProps['sideOffset'];
  alignOffset?: PositionerProps['alignOffset'];
  collisionPadding?: PositionerProps['collisionPadding'];
}

function TooltipContent({
  className,
  container,
  side,
  align,
  sideOffset = 4,
  alignOffset,
  collisionPadding,
  ref,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal container={container}>
      <TooltipPrimitive.Positioner
        className="z-50"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
      >
        <TooltipPrimitive.Popup
          ref={ref}
          className={cn(
            'bg-figma-tooltip',
            'text-figma-tooltip',
            'fill-figma-icon-tooltip',
            'px-2',
            'py-1',
            'min-h-6',
            'whitespace-pre-wrap',
            'break-words',
            'rounded-figma-md',
            'shadow-figma-tooltip',
            'origin-(--transform-origin) transition-[opacity,scale] duration-100 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
            className,
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

TooltipContent.displayName = 'TooltipContent';

interface TooltipProps
  extends
    Omit<React.ComponentPropsWithRef<typeof TooltipRoot>, 'children'>,
    Pick<React.ComponentPropsWithRef<typeof TooltipTrigger>, 'delay' | 'closeDelay'>,
    Omit<TooltipContentProps, 'children' | 'content'> {
  /**
   * The content of the tooltip
   */
  content: React.ReactNode;
  /**
   * The container of the tooltip
   */
  container?: React.ComponentProps<typeof TooltipPrimitive.Portal>['container'];
  /**
   * Whether the tooltip should have an arrow
   *
   * @default true
   */
  withArrow?: boolean;
  /**
   * The trigger element.
   */
  children?: React.ReactElement;
}

/**
 * A popup that displays information related to an element when the element receives keyboard focus
 * or the mouse hovers over it.
 *
 * - [Docs](https://base-ui.com/react/components/tooltip)
 * - [API Reference](https://base-ui.com/react/components/tooltip#api)
 */
function Tooltip({
  // Root props,
  open,
  defaultOpen,
  onOpenChange,
  disableHoverablePopup,
  // Tooltip Trigger
  delay,
  closeDelay,
  children,
  // Tooltip Content
  content,
  withArrow = true,
  sideOffset = withArrow ? 9 : 4,
  // Tooltip Content props
  ...props
}: TooltipProps) {
  return (
    <TooltipRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      disableHoverablePopup={disableHoverablePopup}
    >
      {children ? (
        <TooltipTrigger
          render={children as React.ReactElement}
          delay={delay}
          closeDelay={closeDelay}
        />
      ) : null}
      <TooltipContent
        sideOffset={sideOffset}
        {...props}
      >
        {content}
        {withArrow ? <TooltipArrow /> : null}
      </TooltipContent>
    </TooltipRoot>
  );
}

Tooltip.displayName = 'Tooltip';

export { Tooltip, TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow };

export type { TooltipProps };
