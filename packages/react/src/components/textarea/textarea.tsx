import { cn } from '~/utils';

import { inputVariants, type InputVariantsProps } from '../input';

const textareaVariants = inputVariants;

type TextareaVariantsProps = InputVariantsProps;

interface TextareaProps extends React.ComponentPropsWithRef<'textarea'>, TextareaVariantsProps {
  invalid?: boolean;
  disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ className, variant, invalid, disabled, children, ref, ...props }) => {
  return (
    <div className={cn('peer', 'relative')} data-disabled={disabled} data-invalid={invalid}>
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
          textareaVariants({ variant, disabled, invalid, className }),
        )}
        {...props}
        disabled={disabled}
      />
    </div>
  );
};

Textarea.displayName = 'Textarea';

export { Textarea };

export type { TextareaProps };
