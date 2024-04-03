import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '../../utils/cn';

import { buttonVariants, type ButtonVariantsProps } from './button-variants';

interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>, ButtonVariantsProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * Read [Composition](https://www.radix-ui.com/primitives/docs/guides/composition) guide for more details.
   */
  asChild?: boolean;
}

const Button = forwardRef< React.ElementRef<'button'>, ButtonProps>(
  ({ className, variant, color, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        className={cn(
          buttonVariants({
            variant,
            color,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };

export type { ButtonProps };
