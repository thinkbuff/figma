import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '~/utils';

/**
 * Visually or semantically separates content.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/separator)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/separator#api-reference)
 */
const Separator: React.FC<React.ComponentPropsWithRef<typeof SeparatorPrimitive.Root>> = ({
  className,
  orientation = 'vertical',
  decorative = true,
  ref,
  ...props
}) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'block',
      'shrink-0',
      'bg-figma-border',
      orientation === 'horizontal' ? 'w-full h-px' : 'w-px h-full',
      className,
    )}
    {...props}
  />
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
