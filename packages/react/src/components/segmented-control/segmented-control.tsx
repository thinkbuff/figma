/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import { addClassName, useControllableState } from '~/utils';

import {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupItemProps,
  type ToggleGroupProps,
} from '../toggle-group/toggle-group';

interface SegmentedControlRootProps extends Omit<
  ToggleGroupProps,
  'defaultValue' | 'multiple' | 'onValueChange' | 'value'
> {
  defaultValue?: string | undefined;
  /**
   * Stretches the control to fill the available width.
   */
  fullWidth?: boolean | undefined;
  onValueChange?: ((value: string) => void) | undefined;
  value?: string | undefined;
}

/**
 * A control for switching between mutually exclusive options, like Figma's
 * alignment controls.
 *
 * - [Docs](https://base-ui.com/react/components/toggle-group)
 * - [API Reference](https://base-ui.com/react/components/toggle-group#api)
 */
function SegmentedControlRoot({
  className,
  fullWidth,
  value: valueProp,
  defaultValue,
  onValueChange,
  ref,
  ...props
}: SegmentedControlRootProps) {
  const [value, setValue] = useControllableState<string>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <ToggleGroup
      ref={ref}
      className={addClassName(className, fullWidth && 'flex')}
      {...props}
      multiple={false}
      value={toGroupValue(value)}
      onValueChange={(groupValue) => {
        const nextValue = groupValue[0] as string | undefined;

        if (nextValue !== undefined) {
          setValue(nextValue);
        }
      }}
    />
  );
}

SegmentedControlRoot.displayName = 'SegmentedControl.Root';

function SegmentedControlItem(props: ToggleGroupItemProps) {
  return <ToggleGroupItem {...props} />;
}

SegmentedControlItem.displayName = 'SegmentedControl.Item';

function SegmentedControlText({ className, ref, ...props }: React.ComponentPropsWithRef<'span'>) {
  return (
    <span
      ref={ref}
      className={addClassName(
        className,
        'flex',
        'items-center',
        'p-2',
        'gap-1.5',
        'group-data-disabled:text-figma-disabled',
      )}
      {...props}
    />
  );
}

SegmentedControlText.displayName = 'SegmentedControl.Text';

function toGroupValue(value: string | undefined): string[] {
  if (value === undefined) {
    return [];
  }

  return [value];
}

export { SegmentedControlRoot as Root, SegmentedControlItem as Item, SegmentedControlText as Text };

export type { SegmentedControlRootProps };
