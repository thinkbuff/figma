import { mergeProps } from '@base-ui/react/merge-props';
import { createContext, useContext } from 'react';

import { cn, useSelectOnInputClick } from '~/utils';

import { inputVariants, type InputVariantsProps } from './input-variants';

const InputContext = createContext<{
  disabled?: boolean;
  invalid?: boolean;
  size?: 'default' | 'large';
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
    <InputContext.Provider value={{ disabled, invalid, size }}>
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
            'pr-2',
            inputVariants({ variant, disabled, invalid, size, className }),
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
  const { disabled, invalid, size } = useContext(InputContext);
  const large = size === 'large';
  return (
    <div
      ref={ref}
      className={cn(
        'absolute',
        'flex',
        'shrink-0',
        'w-6',
        'items-center',
        'justify-center',
        'transition-colors',
        // UI3 icon cells are 24px; on 32px inputs they sit inside a 4px inset.
        side === 'left'
          ? [large ? 'left-1 [&~input]:pl-7' : 'left-0 [&~input]:pl-6']
          : [large ? 'right-1 [&~input]:pr-7' : 'right-0 [&~input]:pr-6'],
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
