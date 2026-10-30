import { useControllableState } from '~/utils';

import { ToggleGroup, ToggleGroupItem, ToggleGroupText } from '../toggle-group/toggle-group';

interface SegmentedControlProps extends Omit<
  React.ComponentPropsWithRef<typeof ToggleGroup>,
  'defaultValue' | 'multiple' | 'onValueChange' | 'value'
> {
  /**
   * Stretches the control to fill the available width.
   */
  fullWidth?: boolean | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
  value?: string | undefined;
}

/**
 * A "segmented control" — one choice out of a small set, formerly the UI3
 * "Option Strip". Single value; pressing the selected segment does not
 * deselect it (radio-like keyboard behavior per spec).
 */
function SegmentedControl({
  value: valueProp,
  defaultValue: defaultValueProp,
  onValueChange,
  ref,
  ...props
}: SegmentedControlProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onValueChange,
  });

  return (
    <ToggleGroup
      ref={ref}
      {...props}
      multiple={false}
      value={value === undefined ? [] : [value]}
      onValueChange={(groupValue) => {
        const nextValue = groupValue[0];
        if (nextValue !== undefined) {
          setValue(nextValue);
        }
      }}
    />
  );
}

SegmentedControl.displayName = 'SegmentedControl';

function SegmentedControlItem(props: React.ComponentPropsWithRef<typeof ToggleGroupItem>) {
  return <ToggleGroupItem {...props} />;
}

SegmentedControlItem.displayName = 'SegmentedControlItem';

function SegmentedControlText(props: React.ComponentPropsWithRef<typeof ToggleGroupText>) {
  return <ToggleGroupText {...props} />;
}

SegmentedControlText.displayName = 'SegmentedControlText';

export { SegmentedControl, SegmentedControlItem, SegmentedControlText };
export type { SegmentedControlProps };
