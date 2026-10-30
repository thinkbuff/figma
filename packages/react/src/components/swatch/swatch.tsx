import { cn } from '~/utils';

const CHECKERBOARD = 'repeating-conic-gradient(#d4d4d4 0% 25%, #ffffff 0% 50%) 0 0 / 8px 8px';

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
  /**
   * `opacity` renders the spec's Type=Opacity chit: the fill solid on the
   * left half and at ~24% alpha on the right.
   */
  type?: 'fill' | 'opacity';
  /**
   * `circle` renders the spec's Variant=Circle — a round chit with no
   * inset ring (16px, or 12px at `size="small"`).
   */
  shape?: 'square' | 'circle';
}

/**
 * A fill preview chit — solid color, gradient, or image — over a checkerboard
 * so alpha transparency is visible (UI3 "Value - Paint" swatch).
 */
function Swatch({
  fill,
  size = 'default',
  type = 'fill',
  shape = 'square',
  className,
  style,
  ref,
  ...props
}: SwatchProps) {
  const circle = shape === 'circle';
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'relative inline-block overflow-hidden',
        circle
          ? 'rounded-full'
          : 'rounded-figma-sm after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_var(--figma-color-bordertranslucent)]',
        size === 'small' ? 'size-3' : circle ? 'size-4' : 'size-3.5',
        className,
      )}
      style={style}
      {...props}
    >
      <span
        className="absolute inset-0"
        style={{ background: CHECKERBOARD }}
      />
      {type === 'opacity' ? (
        <>
          <span
            className="absolute inset-y-0 left-0 w-1/2 rounded-l-figma-sm"
            style={fill ? { background: fill } : undefined}
          />
          <span
            className="absolute inset-y-0 right-0 w-1/2 rounded-r-figma-sm opacity-[0.24]"
            style={fill ? { background: fill } : undefined}
          />
        </>
      ) : (
        <span
          className="absolute inset-0"
          style={fill ? { background: fill, backgroundSize: 'cover' } : undefined}
        />
      )}
    </span>
  );
}

Swatch.displayName = 'Swatch';

export { Swatch };
export type { SwatchProps };
