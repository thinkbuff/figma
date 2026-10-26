import { Button as BaseButton } from '@base-ui/react/button';

import { cn } from '~/utils';

import { buttonVariants, type ButtonVariantsProps } from './button-variants';

interface ButtonProps
  extends
    Omit<React.ComponentPropsWithRef<typeof BaseButton>, 'color' | 'className'>,
    ButtonVariantsProps {
  className?: string;
}

function Button({ className, variant, color, ref, ...props }: ButtonProps) {
  return (
    <BaseButton
      ref={ref}
      className={cn(
        buttonVariants({
          variant,
          color,
          className,
        }),
      )}
      {...props}
    />
  );
}

Button.displayName = 'Button';

export { Button };

export type { ButtonProps };
