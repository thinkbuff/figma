import { cn } from '~/utils';

// UI3 initials palette — Figma assigns these fixed user colors; they are not theme tokens.
const palette = {
  purple: 'bg-[#9747ff] text-white',
  blue: 'bg-[#007be5] text-white',
  magenta: 'bg-[#ff24bd] text-white',
  red: 'bg-[#f24822] text-white',
  yellow: 'bg-[#ffcd29] text-figma',
  green: 'bg-[#14ae5c] text-white',
  slate: 'bg-[#667799] text-white',
  neutral: 'bg-figma-secondary text-figma',
} as const;

type AvatarColor = keyof typeof palette;

const sizes = {
  small: 'size-4 text-figma-xs',
  default: 'size-6 text-figma-sm',
  large: 'size-8 text-figma-lg',
} as const;

interface AvatarProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * `default` is 24px (UI3 default user avatar), `small` 16px, `large` 32px.
   */
  size?: keyof typeof sizes;
  shape?: 'circle' | 'square';
  /**
   * Photo source. Falls back to the `name` initial when omitted.
   */
  src?: string;
  /**
   * Display name — used for the `alt` text and the initials fallback.
   */
  name?: string;
  /**
   * Initials background color from the UI3 user palette.
   */
  color?: AvatarColor;
}

/**
 * A user avatar — photo, initials on a user-palette color, or custom children
 * (count "+2", glyph).
 */
function Avatar({
  size = 'default',
  shape = 'circle',
  src,
  name,
  color = 'purple',
  className,
  children,
  ref,
  ...props
}: AvatarProps) {
  const content = src ? (
    <img
      src={src}
      alt={name ?? ''}
      className="size-full object-cover"
    />
  ) : (
    (children ?? name?.charAt(0).toUpperCase() ?? '')
  );
  return (
    <span
      ref={ref}
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- a span is intentional; the img case renders a real <img> inside
      role="img"
      aria-label={name}
      className={cn(
        'inline-flex select-none items-center justify-center overflow-hidden font-figma-default leading-none',
        sizes[size],
        shape === 'circle' ? 'rounded-full' : 'rounded-figma-md',
        !src && palette[color],
        className,
      )}
      {...props}
    >
      {content}
    </span>
  );
}

Avatar.displayName = 'Avatar';

/**
 * Overlapping avatar cluster inside a pill — the UI3 toolbar avatar pattern.
 */
function AvatarGroup({ className, ref, ...props }: React.ComponentPropsWithRef<'span'>) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full bg-figma-secondary p-0.5',
        '[&>*]:-ml-2 [&>*]:outline [&>*]:outline-2 [&>*]:outline-figma-bg [&>*:first-child]:ml-0',
        className,
      )}
      {...props}
    />
  );
}

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup };
export type { AvatarProps };
