import { forwardRef, createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

const InputContext = createContext<{
  disabled?: boolean;
  invalid?: boolean;
}>({
  disabled: false,
  invalid: false,
});

const inputVariants = cva(
  [
    'w-full',
    'h-8',
    'px-2',
    'flex',
    'items-center',
    'text-size-11',
    'text-figma',
    'fill-figma-icon',
    'border',
    'bg-figma',
    'bg-clip-border',
    'outline',
    'outline-1',
    'outline-transparent',
    'rounded-0.5',
    'cursor-default',
    'data-[disabled=true]:(cursor-not-allowed text-figma-disabled fill-figma-icon-disabled)',
    '[&:not([data-disabled=true],[data-invalid=true]):has(input:focus,_input:focus-visible)]:(border-figma-selected -outline-offset-2 outline-figma-border-selected)',
  ],
  {
    variants: {
      variant: {
        default: ['border-transparent', '[&:not([data-disabled=true],[data-invalid=true])]:hover:border-figma'],
        border: ['border-figma', 'data-[disabled=true]:(border-figma-disabled)'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type InputRootElement = React.ElementRef<'input'>;

type InputVariantsProps = VariantProps<typeof inputVariants>;

interface InputProps extends React.ComponentPropsWithRef<'input'>, InputVariantsProps {
  invalid?: boolean;
}

const Input = forwardRef<InputRootElement, InputProps>(
  ({ className, variant, invalid, disabled, children, ...props }, ref) => (
    <InputContext.Provider value={{ disabled, invalid }}>
      <div
        className={cn(inputVariants({ variant, className }))}
        data-disabled={disabled}
        data-invalid={invalid}
      >
        <input
          ref={ref}
          aria-invalid={invalid}
          className={cn([
            'h-6',
            'bg-transparent',
            'placeholder:text-figma-tertiary',
            'w-full',
            'border-none',
            'outline-0',
            disabled ? ['cursor-not-allowed', 'text-figma-disabled'] : ['cursor-default'],
          ])}
          {...props}
          disabled={disabled}
        />
        {children}
      </div>
    </InputContext.Provider>
  ),
);

Input.displayName = 'Input';

type InputSlotElement = React.ElementRef<'div'>;

interface InputSlotProps extends React.ComponentPropsWithoutRef<'div'> {
  side?: 'left' | 'right';
}

const InputSlot = forwardRef<InputSlotElement, InputSlotProps>(({ className, side = 'left', ...props }, ref) => {
  const { disabled, invalid } = useContext(InputContext);
  return (
    <div
      className={cn([
        'flex',
        'shrink-0',
        'w-8',
        'items-center',
        'justify-center',
        side === 'left' ? ['order-first', '-ml-2'] : ['order-last', '-mr-2'],
        disabled
          ? ['cursor-not-allowed', 'text-figma-disabled', 'fill-figma-icon-disabled']
          : ['cursor-default', 'text-figma-secondary', 'fill-figma-icon-secondary'],
        className,
      ])}
      {...props}
      ref={ref}
      data-side={side}
      data-disabled={disabled}
      data-invalid={invalid}
    />
  );
});

InputSlot.displayName = 'InputSlot';

export { type InputProps, Input, type InputSlotProps, InputSlot };
