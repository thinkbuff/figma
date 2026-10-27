import { cn } from '~/utils';

type BadgeColor = 'default' | 'brand' | 'component' | 'danger' | 'warning' | 'success' | 'selected';

const strongColors: Record<BadgeColor, string> = {
  default: 'bg-figma-inverse text-figma-onbrand',
  brand: 'bg-figma-brand text-figma-onbrand',
  component: 'bg-figma-component text-figma-oncomponent',
  danger: 'bg-figma-danger text-figma-ondanger',
  warning: 'bg-figma-warning text-figma-onwarning',
  success: 'bg-figma-success text-figma-onsuccess',
  selected: 'bg-figma-selected-strong text-figma-onselected-strong',
};

const lightColors: Record<BadgeColor, string> = {
  // Neutral light is a gray fill, not an outline (UI3 "Neutral" badge).
  default: 'bg-figma-secondary text-figma',
  brand: 'border border-figma-brand text-figma-brand',
  component: 'border border-figma-component text-figma-component',
  danger: 'border border-figma-danger text-figma-danger',
  warning: 'border border-figma-warning text-figma-warning',
  success: 'border border-figma-success text-figma-success',
  selected: 'border border-figma-selected text-figma-selected',
};

interface BadgeProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * `strong` is the filled form, `light` is the outline form (a gray fill
   * for the neutral badge).
   */
  variant?: 'strong' | 'light';
  color?: BadgeColor;
  /**
   * `small` matches the compact Branching & Merging badge.
   */
  size?: 'default' | 'small';
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
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-figma-md text-figma-sm leading-figma-sm select-none',
        size === 'small' ? 'h-3.5 px-1' : 'h-4 px-1.5',
        variant === 'strong' ? strongColors[color] : lightColors[color],
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

export { Badge };
export type { BadgeProps };
