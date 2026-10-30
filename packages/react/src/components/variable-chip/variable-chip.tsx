import { VariableIcon } from '~/icons';
import { cn } from '~/utils';

interface VariableChipProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * `sunken` matches the chip fill to the surrounding secondary field —
   * UI3 "Soft Deleted", "Value not rendered" and "Disabled Secondary".
   * `elevated` is the default white-on-field pill.
   */
  variant?: 'elevated' | 'sunken';
  /**
   * UI3 "Selected" — light `bg-selected` fill inside a `border-selected`
   * ring. A field focused with a variable applied auto-selects its pill.
   */
  selected?: boolean;
  /**
   * UI3 "On Selected" — solid `bg-onselected` fill.
   */
  onSelected?: boolean;
  disabled?: boolean;
}

/**
 * The pill that represents an applied variable inside an input field
 * (UI3 "Variable Applied Chips").
 */
function VariableChip({
  variant = 'elevated',
  selected,
  onSelected,
  disabled,
  className,
  children,
  ref,
  ...props
}: VariableChipProps) {
  return (
    <span
      ref={ref}
      data-variant={variant}
      data-selected={selected || undefined}
      data-on-selected={onSelected || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        'inline-flex h-4 select-none items-center truncate rounded-figma-md border px-1',
        'text-figma-body-medium',
        onSelected
          ? 'border-figma-onselected bg-figma-onselected'
          : selected
            ? 'border-figma-border-selected bg-figma-selected'
            : variant === 'sunken'
              ? cn('bg-figma-secondary', disabled ? 'border-figma-disabled' : 'border-figma')
              : cn(
                  'bg-figma',
                  disabled ? 'border-figma-disabled' : 'border-figma',
                  !disabled && 'hover:bg-figma-tertiary',
                ),
        disabled ? 'text-figma-disabled' : 'text-figma',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

VariableChip.displayName = 'VariableChip';

interface VariableCellProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * Leading 24px icon cell — defaults to the spec's `icon.24.variable.small`.
   */
  icon?: React.ReactNode;
}

/**
 * The spec's `Variable Cell` — a 24px bordered row pairing a variable icon
 * with a label, used next to fields that accept variables.
 */
function VariableCell({ className, icon, children, ref, ...props }: VariableCellProps) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex h-6 select-none items-center rounded-figma-md border border-figma bg-figma pr-1',
        'text-figma-body-medium text-figma',
        className,
      )}
      {...props}
    >
      <span className="flex size-6 shrink-0 items-center justify-center icon-figma-secondary">
        {icon ?? <VariableIcon />}
      </span>
      {children}
    </span>
  );
}

VariableCell.displayName = 'VariableCell';

export { VariableChip, VariableCell };
export type { VariableCellProps, VariableChipProps };
