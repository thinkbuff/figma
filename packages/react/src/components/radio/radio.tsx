import { Radio } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

import { cn } from '~/utils';

interface RadioGroupProps extends Omit<
  React.ComponentPropsWithRef<typeof RadioGroupPrimitive>,
  'className'
> {
  className?: string;
  inline?: boolean;
}

interface RadioGroupItemProps extends Omit<
  React.ComponentPropsWithRef<typeof Radio.Root>,
  'className'
> {
  className?: string;
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
      className={cn('flex', inline ? 'flex-row gap-5' : 'flex-col gap-2', className)}
      {...props}
    />
  );
}

RadioGroup.displayName = 'RadioGroup';

function RadioGroupItem({ className, ref, ...props }: RadioGroupItemProps) {
  return (
    <Radio.Root
      ref={ref}
      className={cn(
        'peer',
        'size-4',
        'aspect-square',
        'cursor-default',
        'border-4',
        'border-solid',
        'border-transparent',
        'rounded-full',
        'bg-figma',
        'data-checked:bg-figma-icon data-checked:border-figma-bg',
        'data-disabled:data-checked:bg-figma-icon-disabled',
        'outline-solid',
        'outline-1',
        '-outline-offset-1',
        'outline-figma-icon',
        'not-data-disabled:focus-visible:outline-figma-border-selected',
        'data-disabled:outline-figma-icon-disabled',
        className,
      )}
      {...props}
    />
  );
}

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup as Group, RadioGroupItem as GroupItem };
export type { RadioGroupProps, RadioGroupItemProps };
