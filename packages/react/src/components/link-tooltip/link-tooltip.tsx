import { cn } from '~/utils';

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
      className={cn(
        'relative inline-flex flex-col',
        'bg-figma-tooltip text-figma-tooltip',
        'rounded-figma-md shadow-figma-tooltip',
        className,
      )}
      {...props}
    >
      {children}
      {arrow ? (
        <svg
          width={14}
          height={7}
          viewBox="0 0 30 10"
          preserveAspectRatio="none"
          className="fill-figma-bg-tooltip absolute -bottom-1.5 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <polygon points="0,0 30,0 15,10" />
        </svg>
      ) : null}
    </div>
  );
}

LinkTooltip.displayName = 'LinkTooltip';

/**
 * The "Type or paste URL" input row.
 */
function LinkTooltipInput({ className, ref, ...props }: React.ComponentPropsWithRef<'input'>) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-7 w-44 bg-transparent px-2',
        'text-figma-sm leading-figma-sm text-figma-tooltip',
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
      className={cn('flex h-7 items-stretch icon-figma-tooltip-secondary', className)}
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
        'text-figma-sm leading-figma-sm text-figma-tooltip',
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

export { LinkTooltip, LinkTooltipInput, LinkTooltipItem, LinkTooltipAction };
export type { LinkTooltipProps, LinkTooltipItemProps };
