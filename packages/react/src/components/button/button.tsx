import { Slot } from '@radix-ui/react-slot';

import { cn } from '~/utils';

import { buttonVariants, type ButtonVariantsProps } from './button-variants';

interface ButtonProps extends Omit<React.ComponentPropsWithRef<'button'>, 'color'>, ButtonVariantsProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * Read [Composition](https://www.radix-ui.com/primitives/docs/guides/composition) guide for more details.
   */
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className, variant, color, asChild = false, ref, ...props }) => {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
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
};

Button.displayName = 'Button';

export { Button };

export type { ButtonProps };
