import { mergeProps } from '@base-ui/react/merge-props';
import { createContext, useContext } from 'react';

import { cn, useSelectOnInputClick } from '~/utils';

import { inputVariants, type InputVariantsProps } from './input-variants';

const InputContext = createContext<{
  disabled?: boolean;
  invalid?: boolean;
}>({
  disabled: false,
  invalid: false,
});

interface InputProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'size'>, InputVariantsProps {
  invalid?: boolean;
  disabled?: boolean;
  /**
   * The control height. `'default'` is the 24px UI3 size, `'large'` is 32px.
   *
   * @default 'default'
   */
  size?: 'default' | 'large';
  /**
   * Selects the input's contents when clicked, unless the user is selecting manually.
   */
  selectOnClick?: boolean;
  /**
   * Props passed down to the root element of the Input component
   */
  wrapperProps?: Omit<
    React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    'ref'
  > &
    React.DataHTMLAttributes<HTMLLabelElement>;
}

function Input({
  wrapperProps,
  className,
  variant,
  invalid,
  disabled,
  children,
  selectOnClick,
  size = 'default',
  ref,
  ...props
}: InputProps) {
  const selectOnClickProps = useSelectOnInputClick();
  return (
    <InputContext.Provider value={{ disabled, invalid }}>
      <label
        {...wrapperProps}
        className={cn(
          'peer',
          'relative',
          size === 'large' ? 'h-8' : 'h-6',
          'flex',
          'items-center',
          wrapperProps?.className ?? '',
        )}
        data-disabled={disabled}
        data-invalid={invalid}
      >
        {children}
        <input
          ref={ref}
          data-invalid={invalid}
          aria-invalid={invalid}
          className={cn(
            'inline-block',
            'h-full',
            'py-1',
            'pl-2',
            'pr-0',
            inputVariants({ variant, disabled, invalid, className }),
          )}
          {...mergeProps<'input'>(selectOnClick ? selectOnClickProps : {}, props)}
          disabled={disabled}
        />
      </label>
    </InputContext.Provider>
  );
}

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
function InputSlot({ className, side = 'left', ref, ...props }: InputSlotProps) {
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
}

InputSlot.displayName = 'InputSlot';

export { Input, InputSlot };

export type { InputProps, InputSlotProps };
