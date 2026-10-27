import { cn } from '~/utils';

import { inputVariants } from '../input';

const textareaVariants = inputVariants;

// UI3 multi-line inputs only exist in the bordered style, so unlike Input there
// is no variant prop.
interface TextareaProps extends React.ComponentPropsWithRef<'textarea'> {
  invalid?: boolean;
  disabled?: boolean;
}

function Textarea({ className, invalid, disabled, children, ref, ...props }: TextareaProps) {
  return (
    <div
      className={cn('peer', 'relative')}
      data-disabled={disabled}
      data-invalid={invalid}
    >
      {children}
      <textarea
        ref={ref}
        data-invalid={invalid}
        aria-invalid={invalid}
        className={cn(
          'block',
          'px-2',
          'py-1',
          'resize-none',
          'break-words',
          textareaVariants({
            variant: 'border',
            disabled,
            invalid,
            className: cn('bg-figma', className),
          }),
        )}
        {...props}
        disabled={disabled}
      />
    </div>
  );
}

Textarea.displayName = 'Textarea';

export { Textarea };

export type { TextareaProps };
