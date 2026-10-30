import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils';

const iconVariants = cva('block shrink-0 pointer-events-none', {
  variants: {
    size: {
      '1': 'size-1',
      '2': 'size-2',
      '2.5': 'size-2.5',
      '3': 'size-3',
      '3.5': 'size-3.5',
      '4': 'size-4',
      '5': 'size-5',
      '6': 'size-6',
      '7': 'size-7',
      '8': 'size-8',
      '9': 'size-9',
      '10': 'size-10',
    },
  },
  defaultVariants: {
    size: '6',
  },
});

type IconProps = React.ComponentPropsWithRef<'svg'> & VariantProps<typeof iconVariants>;

interface IconOptions {
  path: React.ReactElement;
  viewBox?: string;
  displayName?: string;
}

/**
 * Creates a Figma UI3 icon component. Paths color through the
 * `--color-icon` context variable (set via `icon-figma-*` utilities),
 * so containers can recolor icons without touching text styles.
 */
function createIcon(options: IconOptions) {
  const { path, viewBox = '0 0 24 24', displayName } = options;

  function Icon({ className, size, ref, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        viewBox={viewBox}
        fill="none"
        aria-hidden="true"
        className={cn(iconVariants({ size }), className)}
        {...props}
      >
        {path}
      </svg>
    );
  }

  Icon.displayName = displayName ?? 'Icon';
  return Icon;
}

export { createIcon };
export type { IconProps };
