import { Separator as BaseSeparator } from '@base-ui/react/separator';

import { cn } from '~/utils';

/**
 * Visually or semantically separates content.
 *
 * - [Docs](https://base-ui.com/react/components/separator)
 */
const Separator: React.FC<
  React.ComponentPropsWithRef<typeof BaseSeparator> & { decorative?: boolean }
> = ({ className, orientation = 'vertical', decorative = true, ref, ...props }) => (
  <BaseSeparator
    ref={ref}
    role={decorative ? 'none' : 'separator'}
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

Separator.displayName = 'Separator';

export { Separator };
