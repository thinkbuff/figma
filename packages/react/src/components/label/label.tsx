import { forwardRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '~/utils';

const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
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
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
