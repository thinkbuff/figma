import { Separator as BaseSeparator } from '@base-ui/react/separator';

import { addClassName } from '~/utils';

/**
 * Visually or semantically separates content.
 *
 * Uses `border/default`, the divider token for default surfaces. On menu or
 * tooltip surfaces the spec draws `border/menu` / `border/tooltip` instead —
 * pass `bg-figma-border-menu` / `bg-figma-border-tooltip` via `className`.
 *
 * - [Docs](https://base-ui.com/react/components/separator)
 */
function Separator({
  className,
  orientation = 'vertical',
  decorative = true,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof BaseSeparator> & { decorative?: boolean }) {
  return (
    <BaseSeparator
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      orientation={orientation}
      className={addClassName(
        className,
        'block',
        'shrink-0',
        'bg-figma-border',
        orientation === 'horizontal' ? 'w-full h-px' : 'w-px h-full',
      )}
      {...props}
    />
  );
}

Separator.displayName = 'Separator';

export { Separator };
