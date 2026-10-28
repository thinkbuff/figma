import { cn } from '~/utils';

type BadgeColor = 'default' | 'brand' | 'component' | 'danger' | 'warning' | 'success' | 'selected';

const strongColors: Record<BadgeColor, string> = {
  default: 'bg-figma-inverse text-figma-oninverse',
  brand: 'bg-figma-brand text-figma-onbrand',
  component: 'bg-figma-component text-figma-oncomponent',
  danger: 'bg-figma-danger text-figma-ondanger',
  warning: 'bg-figma-warning text-figma-onwarning',
  success: 'bg-figma-success text-figma-onsuccess',
  selected: 'bg-figma-selected-strong text-figma-onselected-strong',
};

const lightColors: Record<BadgeColor, string> = {
  default: 'border border-figma text-figma',
  brand: 'border border-figma-brand text-figma-brand',
  component: 'border border-figma-component text-figma-component',
  danger: 'border border-figma-danger text-figma-danger',
  warning: 'border border-figma-warning text-figma-warning',
  success: 'border border-figma-success text-figma-success',
  selected: 'border border-figma-onselected text-figma-brand',
};

interface BadgeProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * `strong` is the filled form, `light` is the outline form.
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
        'inline-flex items-center gap-1 rounded-figma-md text-figma-body-medium select-none',
        size === 'small' ? 'h-3.5 px-1' : 'h-4 px-1',
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
