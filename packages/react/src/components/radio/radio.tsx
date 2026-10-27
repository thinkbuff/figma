import { Radio } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

import { addClassName } from '~/utils';

interface RadioGroupProps extends React.ComponentPropsWithRef<typeof RadioGroupPrimitive> {
  inline?: boolean;
}

interface RadioGroupItemProps extends React.ComponentPropsWithRef<typeof Radio.Root> {
  /**
   * `input` renders the spec circle; `button` renders a label pill with no circle.
   */
  variant?: 'input' | 'button';
}

/**
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be
 * checked at a time.
 *
 * - [Docs](https://base-ui.com/react/components/radio)
 * - [API Reference](https://base-ui.com/react/components/radio#api)
 */
function RadioGroup({ className, inline = false, ref, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      ref={ref}
      className={addClassName(className, 'flex', inline ? 'flex-row gap-5' : 'flex-col gap-2')}
      {...props}
    />
  );
}

RadioGroup.displayName = 'RadioGroup';

function RadioGroupItem({ className, variant = 'input', ref, ...props }: RadioGroupItemProps) {
  return (
    <Radio.Root
      ref={ref}
      className={addClassName(
        className,
        'peer',
        'cursor-default',
        'bg-figma',
        variant === 'input'
          ? 'size-4 aspect-square border-4 border-solid border-transparent rounded-full data-checked:bg-figma-icon data-checked:border-figma-bg data-disabled:data-checked:bg-figma-icon-disabled outline-solid outline-1 -outline-offset-1 outline-figma-icon not-data-disabled:focus-visible:outline-figma-border-selected data-disabled:outline-figma-icon-disabled'
          : 'flex h-6 w-full items-center justify-center rounded-figma-md border border-solid border-figma px-3 text-figma-sm leading-figma-sm text-figma data-checked:border-figma-brand data-checked:bg-figma-selected not-data-disabled:focus-visible:border-figma-border-selected data-disabled:border-figma-disabled data-disabled:text-figma-disabled',
      )}
      {...props}
    />
  );
}

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup as Group, RadioGroupItem as GroupItem };
export type { RadioGroupProps, RadioGroupItemProps };
