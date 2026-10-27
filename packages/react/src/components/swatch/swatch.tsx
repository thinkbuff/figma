import { cn } from '~/utils';

interface SwatchProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * The fill preview — any CSS background value: solid color (including
   * alpha), gradient, or `url(...)`/`image-set(...)`.
   */
  fill?: string;
  /**
   * `default` is 14px (the UI3 chit inside a 24px field cell), `small` is 12px.
   */
  size?: 'default' | 'small';
}

/**
 * A fill preview chit — solid color, gradient, or image — over a checkerboard
 * so alpha transparency is visible (UI3 "Value - Paint" swatch).
 */
function Swatch({ fill, size = 'default', className, style, ref, ...props }: SwatchProps) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'relative inline-block overflow-hidden rounded-figma-sm',
        'after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_#0000001a] dark:after:shadow-[inset_0_0_0_1px_#ffffff1a]',
        size === 'small' ? 'size-3' : 'size-3.5',
        className,
      )}
      style={style}
      {...props}
    >
      <span
        className="absolute inset-0"
        style={{
          background: 'repeating-conic-gradient(#d4d4d4 0% 25%, #ffffff 0% 50%) 0 0 / 8px 8px',
        }}
      />
      <span
        className="absolute inset-0"
        style={fill ? { background: fill, backgroundSize: 'cover' } : undefined}
      />
    </span>
  );
}

Swatch.displayName = 'Swatch';

export { Swatch };
export type { SwatchProps };
