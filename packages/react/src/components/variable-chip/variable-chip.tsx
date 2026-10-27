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
        'inline-flex h-4.5 select-none items-center truncate rounded-figma-md border px-1',
        'text-figma-sm leading-figma-sm',
        onSelected
          ? 'border-figma-onselected bg-figma-onselected'
          : selected
            ? 'border-figma-border-selected bg-figma-selected'
            : variant === 'sunken'
              ? 'border-figma bg-figma-secondary'
              : cn('border-figma bg-figma', !disabled && 'hover:bg-figma-tertiary'),
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

export { VariableChip };
export type { VariableChipProps };
