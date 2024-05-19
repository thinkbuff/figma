import { forwardRef, createContext, useContext, useRef, useEffect } from 'react';

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
  ({ className, variant, invalid, disabled, children, ...props }, forwardedRef) => {
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (!ref || !forwardedRef) {
        return;
      }

      const node = ref.current;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    }, [ref]);

    return (
      <InputContext.Provider value={{ disabled, invalid }}>
        <div
          className={cn('peer', 'relative', 'h-8', 'flex', 'items-center')}
          data-disabled={disabled}
          data-invalid={invalid}
          onClick={() => ref.current?.focus?.()}
        >
          {children}
          <input
            ref={ref}
            aria-invalid={invalid}
            className={cn(
              'inline-block',
              'h-full',
              'px-2',
              inputVariants({ variant, disabled, invalid, className }),
            )}
            {...props}
            disabled={disabled}
          />
        </div>
      </InputContext.Provider>
    );
  },
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
});

InputSlot.displayName = 'InputSlot';

export { Input, InputSlot };

export type { InputProps, InputSlotProps };
