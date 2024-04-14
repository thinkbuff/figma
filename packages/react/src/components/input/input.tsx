import { forwardRef, createContext, useContext } from 'react';

import { cn } from '~/utils';

import { inputVariants, type InputVariantsProps } from './input-variants';

const InputContext = createContext<{
  disabled?: boolean;
  invalid?: boolean;
}>({
  disabled: false,
  invalid: false,
});

interface InputProps extends React.ComponentPropsWithRef<'input'>, InputVariantsProps {
  invalid?: boolean;
  disabled?: boolean;
}

const Input = forwardRef<React.ElementRef<'input'>, InputProps>(
  ({ className, variant, invalid, disabled, children, ...props }, ref) => (
    <InputContext.Provider value={{ disabled, invalid }}>
      <div
        className={cn('peer', 'relative', 'h-8', 'px-2', inputVariants({ variant, disabled, invalid, className }))}
        data-disabled={disabled}
        data-invalid={invalid}
      >
        <input
          ref={ref}
          aria-invalid={invalid}
          className={cn(
            'h-6',
            'bg-transparent',
            'placeholder:text-figma-tertiary',
            'w-full',
            'border-none',
            'outline-0',
            disabled ? ['cursor-not-allowed', 'text-figma-disabled'] : ['cursor-default'],
          )}
          {...props}
          disabled={disabled}
        />
        {children}
      </div>
    </InputContext.Provider>
  ),
);

Input.displayName = 'Input';

interface InputSlotProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The side of the Input that the icon or button is on.
   */
  side?: 'left' | 'right';
}

/**
 * Contains icons or buttons associated with an Input.
 */
const InputSlot = forwardRef<React.ElementRef<'div'>, InputSlotProps>(({ className, side = 'left', ...props }, ref) => {
  const { disabled, invalid } = useContext(InputContext);
  return (
    <div
      ref={ref}
      className={cn(
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
      )}
      {...props}
      data-side={side}
      data-invalid={invalid}
      data-disabled={disabled}
    />
  );
});

InputSlot.displayName = 'InputSlot';

export { Input, InputSlot };

export type { InputProps, InputSlotProps };
