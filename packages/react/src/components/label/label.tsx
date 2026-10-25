import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '~/utils';

const Label: React.FC<React.ComponentPropsWithRef<typeof LabelPrimitive.Root>> = ({
  className,
  ref,
  ...props
}) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-figma-sm leading-figma-sm',
      'font-medium',
      'cursor-default',
      'disabled:cursor-not-allowed disabled:text-figma-disabled',
      'peer-disabled:cursor-not-allowed peer-disabled:text-figma-disabled',
      className,
    )}
    {...props}
  />
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
