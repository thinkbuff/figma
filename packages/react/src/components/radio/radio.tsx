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
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 *
 * - [Docs](https://base-ui.com/react/components/radio)
 * - [API Reference](https://base-ui.com/react/components/radio#api)
 */
const RadioGroup: React.FC<RadioGroupProps> = ({ className, inline = false, ref, ...props }) => {
  return (
    <RadioGroupPrimitive
      ref={ref}
      className={cn('flex', 'gap-2', inline ? 'flex-row' : 'flex-col', className)}
      {...props}
    />
  );
};

RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ className, ref, ...props }) => {
  return (
    <Radio.Root
      ref={ref}
      className={cn(
        'peer',
        'group',
        'size-3.5',
        'text-figma',
        'fill-figma-icon',
        'border',
        'border-solid',
        'border-figma-icon',
        'rounded-full',
        'aspect-square',
        'cursor-default',
        'outline-solid',
        'outline-1',
        '-outline-offset-2',
        'outline-transparent',
        'bg-clip-border',
        'not-data-[disabled]:focus:border-figma-selected not-data-[disabled]:focus:outline-figma-border-selected',
        'data-[disabled]:cursor-not-allowed data-[disabled]:text-figma-disabled data-[disabled]:fill-figma-icon-disabled data-[disabled]:border-figma-disabled-strong',
        className,
      )}
      {...props}
    >
      <Radio.Indicator className="pointer-events-none flex items-center justify-center after:block after:size-1.5 after:rounded-full after:content-[''] after:bg-figma-icon group-data-[disabled]:after:bg-figma-icon-disabled" />
    </Radio.Root>
  );
};

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup as Group, RadioGroupItem as GroupItem };
export type { RadioGroupProps, RadioGroupItemProps };
