import { Button as BaseButton } from '@base-ui/react/button';

import { addClassName } from '~/utils';

import { buttonVariants, type ButtonVariantsProps } from './button-variants';

interface ButtonProps
  extends
    Omit<React.ComponentPropsWithRef<typeof BaseButton>, 'color'>,
    Omit<ButtonVariantsProps, 'class' | 'className'> {}

function Button({ className, variant, color, size, fullWidth, ref, ...props }: ButtonProps) {
  return (
    <BaseButton
      ref={ref}
      className={addClassName(className, buttonVariants({ variant, color, size, fullWidth }))}
      {...props}
    />
  );
}

Button.displayName = 'Button';

export { Button };

export type { ButtonProps };
