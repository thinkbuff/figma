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
    'flex',
    'items-center',
    'text-size-11',
    'text-figma',
    'fill-figma-icon',
    'cursor-default',
    'bg-figma',
    'bg-clip-border',
    'border',
    'outline',
    'outline-1',
    '-outline-offset-2',
    'outline-transparent',
    'rounded-0.5',
    'focus-within:(border-figma-selected outline-figma-border-selected)',
  ],
  {
    variants: {
      variant: {
        default: ['border-transparent', 'not-focus-within:hover:border-figma'],
        border: ['border-figma'],
      },
      invalid: {
        true: ['text-figma-danger', 'fill-figma-icon-danger', 'border-figma-danger'],
        false: '',
      },
      disabled: {
        true: ['cursor-not-allowed', 'text-figma-disabled', 'fill-figma-icon-disabled'],
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        disabled: true,
        className: [
          'border-transparent',
          'focus-within:(border-transparent outline-transparent)',
          'not-focus-within:hover:border-transparent',
        ],
      },
      {
        variant: 'border',
        disabled: true,
        className: ['border-figma-disabled', 'focus-within:(border-figma-disabled outline-transparent)'],
      },
      {
        disabled: false,
        invalid: true,
        className: [
          'focus-within:(border-figma-danger outline-figma-transparent)',
          'not-focus-within:hover:border-figma-danger',
        ],
      },
    ],
    defaultVariants: {
      variant: 'default',
      invalid: false,
      disabled: false,
    },
  },
);

type InputRootElement = React.ElementRef<'input'>;

type InputVariantsProps = VariantProps<typeof inputVariants>;

interface InputProps extends React.ComponentPropsWithRef<'input'>, InputVariantsProps {
  invalid?: boolean;
  disabled?: boolean;
}

const Input = forwardRef<InputRootElement, InputProps>(
  ({ className, variant, invalid, disabled, children, ...props }, ref) => (
    <InputContext.Provider value={{ disabled, invalid }}>
      <div
        className={cn(['relative', 'h-8', 'px-2'], inputVariants({ variant, disabled, invalid, className }))}
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
  /**
   * The side of the Input that the icon or button is on.
   */
  side?: 'left' | 'right';
}

/**
 * Contains icons or buttons associated with an Input.
 */
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
        'transition-colors',
        side === 'left' ? ['order-first', '-ml-2'] : ['order-last', '-mr-2'],
        disabled
          ? ['cursor-not-allowed', 'text-figma-disabled', 'fill-figma-icon-disabled']
          : ['cursor-default', 'text-figma-secondary', 'fill-figma-icon-secondary'],
        invalid && !disabled ? ['text-figma-danger', 'fill-figma-icon-danger'] : '',
        className,
      ])}
      {...props}
      ref={ref}
      data-side={side}
      data-invalid={invalid}
      data-disabled={disabled}
    />
  );
});

InputSlot.displayName = 'InputSlot';

export { type InputProps, Input, type InputSlotProps, InputSlot, type InputVariantsProps, inputVariants };
