import { Button as BaseButton } from '@base-ui/react/button';

import { cn } from '~/utils';

import { buttonVariants, type ButtonVariantsProps } from './button-variants';

interface ButtonProps
  extends
    Omit<React.ComponentPropsWithRef<typeof BaseButton>, 'color' | 'className'>,
    ButtonVariantsProps {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, variant, color, ref, ...props }) => (
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

Button.displayName = 'Button';

export { Button };

export type { ButtonProps };
