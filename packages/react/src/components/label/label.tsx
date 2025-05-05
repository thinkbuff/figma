import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '~/utils';

const Label: React.FC<React.ComponentPropsWithRef<typeof LabelPrimitive.Root>> = ({ className, ref, ...props }) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'font-size-11',
      'font-medium',
      'leading-none',
      'cursor-default',
      'disabled:(cursor-not-allowed text-figma-disabled)',
      'peer-disabled:(cursor-not-allowed text-figma-disabled)',
      className,
    )}
    {...props}
  />
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
