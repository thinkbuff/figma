import { cn } from '~/utils';

// The spec's `_multiplayer/*` fills paired with `special/textonmultiplayer*` text.
const palette = {
  purple: 'bg-figma-multiplayerpurple text-figma-textonmultiplayerpurple',
  blue: 'bg-figma-multiplayerblue text-figma-textonmultiplayerblue',
  pink: 'bg-figma-multiplayerpink text-figma-textonmultiplayerpink',
  red: 'bg-figma-multiplayerred text-figma-textonmultiplayerred',
  yellow: 'bg-figma-multiplayeryellow text-figma-textonmultiplayeryellow',
  green: 'bg-figma-multiplayergreen text-figma-textonmultiplayergreen',
  grey: 'bg-figma-multiplayergrey text-figma-textonmultiplayergrey',
  neutral: 'bg-figma-secondary text-figma',
  'overflow-unread': 'bg-figma-brand-secondary text-figma-onbrand',
  'overflow-read': 'bg-figma-secondary text-figma',
} as const;

type AvatarColor = keyof typeof palette;

const sizes = {
  small: 'size-4 text-figma-body-small leading-figma-body-small font-figma-strong',
  default: 'size-6 text-figma-body-large font-figma-default',
  large: 'size-8 text-figma-body-large font-figma-strong',
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
   * Initials background color from the UI3 user palette. `overflow-unread` /
   * `overflow-read` render the spec's "+N" overflow variants.
   */
  color?: AvatarColor;
  /**
   * The spec's `State=Disabled` — `bg-tertiary` fill with `text-default`.
   */
  disabled?: boolean;
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
  disabled,
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
        'inline-flex select-none items-center justify-center overflow-hidden leading-none',
        sizes[size],
        shape === 'circle'
          ? 'rounded-full'
          : size === 'small'
            ? 'rounded-figma-sm'
            : 'rounded-figma-md',
        !src && (disabled ? 'bg-figma-tertiary text-figma' : palette[color]),
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
