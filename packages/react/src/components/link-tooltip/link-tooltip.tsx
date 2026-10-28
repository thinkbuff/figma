import { Popover as PopoverPrimitive } from '@base-ui/react/popover';

import { addClassName, cn } from '~/utils';

const linkTooltipChrome = [
  'relative inline-flex w-fit flex-col',
  'bg-figma-tooltip text-figma-tooltip',
  'rounded-figma-md shadow-figma-tooltip',
];

function LinkTooltipArrow({ className, ...props }: React.ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width={12}
      height={6}
      viewBox="0 0 12 6"
      preserveAspectRatio="none"
      className={cn('fill-figma-bg-tooltip absolute', className)}
      aria-hidden="true"
      {...props}
    >
      <polygon points="0,0 12,0 6,6" />
    </svg>
  );
}

interface LinkTooltipProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * Renders the downward-pointing tooltip arrow under the box.
   */
  arrow?: boolean;
}

/**
 * The link editor popup (UI3 "Link tooltip") — a tooltip-styled box holding
 * a URL input or a row of link actions (Open …, Send mail, Edit).
 */
function LinkTooltip({ arrow, className, children, ref, ...props }: LinkTooltipProps) {
  return (
    <div
      ref={ref}
      className={cn(linkTooltipChrome, className)}
      {...props}
    >
      {children}
      {arrow ? <LinkTooltipArrow className="-bottom-1.5 left-1/2 -translate-x-1/2" /> : null}
    </div>
  );
}

LinkTooltip.displayName = 'LinkTooltip';

type PositionerProps = React.ComponentPropsWithRef<typeof PopoverPrimitive.Positioner>;

interface LinkTooltipPopupProps extends React.ComponentPropsWithRef<typeof PopoverPrimitive.Popup> {
  /**
   * Renders the arrow on the edge facing the anchor (side-aware).
   *
   * @default true
   */
  arrow?: boolean;
  /**
   * Specify a container element to portal the popup into.
   *
   * @default document.body
   */
  container?: React.ComponentProps<typeof PopoverPrimitive.Portal>['container'];
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: PositionerProps['sideOffset'];
  alignOffset?: PositionerProps['alignOffset'];
  collisionPadding?: PositionerProps['collisionPadding'];
}

/**
 * The link tooltip rendered as a popover popup — anchors it to a field or
 * link and keeps it open for interaction. Compose inside `Popover.Root`.
 */
function LinkTooltipPopup({
  arrow = true,
  container,
  side = 'top',
  align = 'center',
  sideOffset = 7,
  alignOffset,
  collisionPadding,
  className,
  children,
  ref,
  ...props
}: LinkTooltipPopupProps) {
  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Positioner
        className="group/positioner z-50"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
      >
        <PopoverPrimitive.Popup
          ref={ref}
          className={addClassName(className, linkTooltipChrome, 'outline-0')}
          {...props}
        >
          {children}
          {arrow ? (
            <LinkTooltipArrow className="left-1/2 -translate-x-1/2 group-data-[side=bottom]/positioner:-top-1.5 group-data-[side=bottom]/positioner:rotate-180 group-data-[side=top]/positioner:-bottom-1.5" />
          ) : null}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

LinkTooltipPopup.displayName = 'LinkTooltipPopup';

/**
 * The "Type or paste URL" input row.
 */
function LinkTooltipInput({ className, ref, ...props }: React.ComponentPropsWithRef<'input'>) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-6 w-46 bg-transparent px-2',
        'text-figma-body-medium text-figma-tooltip',
        'cursor-default outline-none',
        'placeholder:text-figma-tooltip-secondary',
        className,
      )}
      {...props}
    />
  );
}

LinkTooltipInput.displayName = 'LinkTooltipInput';

interface LinkTooltipItemProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * Leading icon — e.g. link, phone, mail, file glyphs (secondary color).
   */
  icon?: React.ReactNode;
}

/**
 * A row of link actions separated by full-height dividers:
 * `[icon] Open google.com | Edit`.
 */
function LinkTooltipItem({ icon, className, children, ref, ...props }: LinkTooltipItemProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-6 items-stretch overflow-hidden rounded-figma-md icon-figma-tooltip-secondary',
        className,
      )}
      {...props}
    >
      {icon ? <span className="flex w-6 shrink-0 items-center justify-center">{icon}</span> : null}
      <div className="flex items-stretch [&>*+*]:border-l [&>*+*]:border-figma-tooltip">
        {children}
      </div>
    </div>
  );
}

LinkTooltipItem.displayName = 'LinkTooltipItem';

/**
 * A single action inside a `LinkTooltipItem` — `Open google.com`, `Edit`, …
 */
function LinkTooltipAction({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<'button'>) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'flex cursor-default items-center px-2',
        'text-figma-body-medium text-figma-tooltip',
        'whitespace-nowrap hover:bg-figma-tooltip-hover',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

LinkTooltipAction.displayName = 'LinkTooltipAction';

export { LinkTooltip, LinkTooltipPopup, LinkTooltipInput, LinkTooltipItem, LinkTooltipAction };
export type { LinkTooltipProps, LinkTooltipPopupProps, LinkTooltipItemProps };
