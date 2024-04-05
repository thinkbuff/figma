import { forwardRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '../../utils';

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  inline?: boolean;
}

/**
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/radio-group)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/radio-group#api-reference)
 */
const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, inline = false, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn([
        'flex',
        'gap-2',
        inline ? 'flex-row' : 'flex-col',
        className,
      ])}
      {...props}
      ref={ref}
    />
  );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn([
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
        'outline',
        'outline-1',
        '-outline-offset-2',
        'outline-transparent',
        'bg-clip-border',
        'not-disabled:focus:(border-figma-selected outline-figma-border-selected)',
        'disabled:(cursor-not-allowed text-figma-disabled fill-figma-icon-disabled border-figma-disabled-strong)',
        className,
      ])}
      {...props}
      ref={ref}
    >
      <RadioGroupPrimitive.Indicator className="pointer-events-none flex items-center justify-center after:block after:size-1.5 after:rounded-full after:content-[''] after:bg-figma-icon group-disabled:after:bg-figma-icon-disabled" />
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup as Group, RadioGroupItem as GroupItem };
