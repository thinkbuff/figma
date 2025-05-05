import { createContext, useContext } from 'react';

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
  /**
   * Props passed down to the root element of the Input component
   */
  wrapperProps?: Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> &
    React.DataHTMLAttributes<'div'>;
}

const Input: React.FC<InputProps> = ({
  wrapperProps,
  className,
  variant,
  invalid,
  disabled,
  children,
  ref,
  ...props
}) => {
  return (
    <InputContext.Provider value={{ disabled, invalid }}>
      <div
        {...wrapperProps}
        className={cn('peer', 'relative', 'h-8', 'flex', 'items-center', wrapperProps?.className ?? '')}
        data-disabled={disabled}
        data-invalid={invalid}
        onClick={() => (ref as React.RefObject<HTMLInputElement>).current?.focus?.()}
      >
        {children}
        <input
          ref={ref}
          data-invalid={invalid}
          aria-invalid={invalid}
          className={cn('inline-block', 'h-full', 'px-2', inputVariants({ variant, disabled, invalid, className }))}
          {...props}
          disabled={disabled}
        />
      </div>
    </InputContext.Provider>
  );
};

Input.displayName = 'Input';

interface InputSlotProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * The side of the Input that the icon or button is on.
   */
  side?: 'left' | 'right';
}

/**
 * Contains icons or buttons associated with an Input.
 */
const InputSlot: React.FC<InputSlotProps> = ({ className, side = 'left', ref, ...props }) => {
  const { disabled, invalid } = useContext(InputContext);
  return (
    <div
      ref={ref}
      className={cn(
        'absolute',
        'flex',
        'shrink-0',
        'w-8',
        'items-center',
        'justify-center',
        'transition-colors',
        side === 'left' ? ['left-0', '[&~input]:pl-8'] : ['right-0', '[&~input]:pr-8'],
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
};

InputSlot.displayName = 'InputSlot';

export { Input, InputSlot };

export type { InputProps, InputSlotProps };
