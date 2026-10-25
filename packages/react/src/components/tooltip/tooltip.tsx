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

const TooltipArrow: React.FC<TooltipArrowProps> = ({ className, ref, ...props }) => (
  <TooltipPrimitive.Arrow
    className={cn('fill-figma-bg-tooltip', className)}
    ref={ref}
    {...props}
  />
);

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

const TooltipContent: React.FC<TooltipContentProps> = ({
  className,
  container,
  side,
  align,
  sideOffset = 4,
  alignOffset,
  collisionPadding,
  ref,
  ...props
}) => (
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
          'px-3',
          'rounded-figma-sm',
          'py-2',
          'origin-(--transform-origin) transition-[opacity,scale] duration-100 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 motion-reduce:transition-none',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
);

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
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 * - [Docs](https://base-ui.com/react/components/tooltip)
 * - [API Reference](https://base-ui.com/react/components/tooltip#api)
 */
const Tooltip = ({
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
  // Tooltip Content props
  ...props
}: TooltipProps) => (
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
    <TooltipContent {...props}>
      {content}
      {withArrow ? <TooltipArrow /> : null}
    </TooltipContent>
  </TooltipRoot>
);

Tooltip.displayName = 'Tooltip';

export { Tooltip, TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow };

export type { TooltipProps };
