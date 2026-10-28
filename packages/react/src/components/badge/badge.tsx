import { cn } from '~/utils';

type BadgeColor =
  | 'default'
  | 'brand'
  | 'component'
  | 'danger'
  | 'warning'
  | 'success'
  | 'selected'
  | 'figjam'
  | 'menu'
  | 'merged'
  | 'archived';

type BadgeAltColor = 'default' | 'count' | 'count-inactive' | 'strong';

const strongColors: Record<BadgeColor, string> = {
  default: 'bg-figma-inverse text-figma-oninverse',
  brand: 'bg-figma-brand text-figma-onbrand',
  component: 'bg-figma-component text-figma-oncomponent',
  danger: 'bg-figma-danger text-figma-ondanger',
  // The spec's Warn strong fill is `icon-warning`, not `bg-warning`.
  warning: 'bg-figma-icon-warning text-figma-onwarning',
  success: 'bg-figma-success text-figma-onsuccess',
  selected: 'bg-figma-selected-strong text-figma-onselected-strong',
  figjam: 'bg-figma-figjam text-figma-onfigjam',
  menu: 'bg-figma-toolbar text-figma-onbrand',
  merged: 'bg-figma border-figma-success text-figma-success',
  archived: 'bg-figma border-figma-disabled text-figma-disabled',
};

const lightColors: Record<BadgeColor, string> = {
  default: 'border border-figma text-figma',
  brand: 'border border-figma-brand text-figma-brand',
  component: 'border border-figma-component text-figma-component',
  danger: 'border border-figma-danger text-figma-danger',
  warning: 'border border-figma-warning text-figma-warning',
  success: 'border border-figma-success text-figma-success',
  selected: 'border border-figma-onselected text-figma-brand',
  figjam: 'border border-figma-figjam text-figma-figjam',
  menu: 'border border-figma text-figma',
  merged: 'border border-figma-success bg-figma text-figma-success',
  archived: 'border border-figma-disabled bg-figma text-figma-disabled',
};

// The "Badge small alt" family — subtle fills, no border.
const altColors: Record<BadgeAltColor, string> = {
  default: 'bg-figma-tertiary text-figma',
  count: 'bg-figma-selected text-figma',
  'count-inactive': 'bg-figma-hover text-figma-secondary',
  strong: 'bg-figma-inverse text-figma-oninverse',
};

interface BadgeProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * `light` is the outline form, `strong` is filled, `alt` is the spec's
   * "Badge small alt" subtle-fill family (borderless).
   */
  variant?: 'light' | 'strong' | 'alt';
  color?: BadgeColor | BadgeAltColor;
  /**
   * `default` is the 16px "Badge small" (11px text); `large` is the spec's
   * "Badge large" — also 16px but 13px text.
   */
  size?: 'default' | 'large';
  /**
   * Leading slot — e.g. a status dot or the selected check icon.
   */
  icon?: React.ReactNode;
}

/**
 * A small status label (UI3 Badge) — "New", "Beta", "Merged", …
 */
function Badge({
  variant = 'light',
  color = 'default',
  size = 'default',
  icon,
  className,
  children,
  ref,
  ...props
}: BadgeProps) {
  const colors =
    variant === 'alt'
      ? (altColors[color as BadgeAltColor] ?? altColors.default)
      : variant === 'strong'
        ? (strongColors[color as BadgeColor] ?? strongColors.default)
        : (lightColors[color as BadgeColor] ?? lightColors.default);
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-figma-md select-none',
        size === 'large' ? 'text-figma-body-large' : 'text-figma-body-medium',
        'h-4 px-1',
        colors,
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';

/**
 * The spec's "Badge Dot" — a 9x9 `bg-default` pill holding a 5x5
 * `bg-brand` dot.
 */
function BadgeDot({ className, ref, ...props }: React.ComponentPropsWithRef<'span'>) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex size-[9px] items-center justify-center rounded-figma-md bg-figma',
        className,
      )}
      {...props}
    >
      <span className="size-[5px] rounded-[3px] bg-figma-brand" />
    </span>
  );
}

BadgeDot.displayName = 'BadgeDot';

export { Badge, BadgeDot };
export type { BadgeProps };
