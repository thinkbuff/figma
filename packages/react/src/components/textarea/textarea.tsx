import { forwardRef } from 'react';

import { cn } from '../../utils/cn';
import { inputVariants, type InputVariantsProps } from '../input';

const textareaVariants = inputVariants;

type TextareaRootElement = React.ElementRef<'textarea'>;

type TextareaVariantsProps = InputVariantsProps;

interface TextareaProps extends React.ComponentPropsWithRef<'textarea'>, TextareaVariantsProps {
  invalid?: boolean;
  disabled?: boolean;
}

const Textarea = forwardRef<TextareaRootElement, TextareaProps>(
  ({ className, variant, invalid, disabled, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          ['relative', 'overflow-hidden'],
          textareaVariants({ variant, disabled, invalid, className }),
        )}
        data-disabled={disabled}
        data-invalid={invalid}
      >
        <textarea
          className={cn([
            'block',
            'px-2',
            'py-1',
            'min-h-15',
            'bg-transparent',
            'placeholder:text-figma-tertiary',
            'w-full',
            'border-none',
            'outline-0',
            'resize-none',
            disabled ? ['cursor-not-allowed', 'text-figma-disabled'] : ['cursor-default'],
          ])}
          {...props}
          ref={ref}
          disabled={disabled}
          data-invalid={invalid}
        />
        {children}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { type TextareaProps, Textarea };
