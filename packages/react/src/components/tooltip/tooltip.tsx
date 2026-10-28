import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import { addClassName } from '~/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

interface TooltipArrowProps extends React.ComponentPropsWithRef<typeof TooltipPrimitive.Arrow> {}

function TooltipArrow({ className, ref, ...props }: TooltipArrowProps) {
  return (
    <TooltipPrimitive.Arrow
      className={addClassName(
        className,
        'fill-figma-bg-tooltip',
        'data-[side=bottom]:-top-1.5 data-[side=bottom]:rotate-180',
        'data-[side=top]:-bottom-1.5',
        'data-[side=left]:right-[-9px] data-[side=left]:-rotate-90',
        'data-[side=right]:left-[-9px] data-[side=right]:rotate-90',
      )}
      ref={ref}
      render={
        <svg
          width={12}
          height={6}
          viewBox="0 0 12 6"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 12,0 6,6" />
        </svg>
      }
      {...props}
    />
  );
}

TooltipArrow.displayName = 'TooltipArrow';

type PositionerProps = React.ComponentPropsWithRef<typeof TooltipPrimitive.Positioner>;

interface TooltipContentProps extends React.ComponentPropsWithRef<typeof TooltipPrimitive.Popup> {
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
          className={addClassName(
            className,
            'bg-figma-tooltip',
            'text-figma-tooltip',
            'fill-figma-icon-tooltip',
            'font-figma-default',
            'text-figma-body-medium',
            'max-w-50',
            'px-2',
            'py-1',
            'min-h-6',
            'whitespace-pre-wrap',
            'break-words',
            'rounded-figma-md',
            'shadow-figma-tooltip',
            'origin-(--transform-origin) transition-[opacity,scale] duration-100 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
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
   * Optional hotkey hint rendered dimmed after the content (UI3 "⌘V").
   */
  hotkey?: React.ReactNode;
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
  hotkey,
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
        {hotkey ? <span className="text-figma-tooltip-secondary ml-1">{hotkey}</span> : null}
        {withArrow ? <TooltipArrow /> : null}
      </TooltipContent>
    </TooltipRoot>
  );
}

Tooltip.displayName = 'Tooltip';

export { Tooltip, TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow };

export type { TooltipProps };
