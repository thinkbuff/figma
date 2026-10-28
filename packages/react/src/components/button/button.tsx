import { Button as BaseButton } from '@base-ui/react/button';

import { addClassName } from '~/utils';

import { buttonVariants, type ButtonVariantsProps } from './button-variants';

interface ButtonProps
  extends
    Omit<React.ComponentPropsWithRef<typeof BaseButton>, 'color'>,
    Omit<ButtonVariantsProps, 'class' | 'className' | 'icon'> {
  /**
   * Leading icon slot (Design "Icon Lead") — rendered in a 24px box.
   */
  icon?: React.ReactNode;
}

function Button({ className, variant, size, icon, children, ref, ...props }: ButtonProps) {
  return (
    <BaseButton
      ref={ref}
      className={addClassName(className, buttonVariants({ variant, size, icon: icon != null }))}
      {...props}
    >
      {icon ? (
        <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      ) : null}
      {children}
    </BaseButton>
  );
}

Button.displayName = 'Button';

export { Button };

export type { ButtonProps };
