import { CloseIcon } from '~/icons';
import { cn } from '~/utils';

type VisualBellColor = 'default' | 'danger' | 'brand' | 'success' | 'component';

const colors: Record<VisualBellColor, string> = {
  default: 'bg-[#2c2c2c] text-figma-onbrand [--bell-edge:rgba(255,255,255,0.1)]',
  danger: 'bg-figma-danger text-figma-ondanger [--bell-edge:rgba(0,0,0,0.1)]',
  brand: 'bg-figma-brand text-figma-onbrand [--bell-edge:rgba(255,255,255,0.1)]',
  success: 'bg-figma-success text-figma-onsuccess [--bell-edge:rgba(255,255,255,0.1)]',
  component: 'bg-figma-component text-figma-oncomponent [--bell-edge:rgba(255,255,255,0.1)]',
};

interface VisualBellRootProps extends React.ComponentPropsWithRef<'div'> {
  color?: VisualBellColor;
}

/**
 * A transient message pill overlaid on the page (UI3 "Visual Bell") — a label
 * zone plus a CTA rail of actions and dismiss.
 */
function VisualBellRoot({ color = 'default', className, ref, ...props }: VisualBellRootProps) {
  return (
    <div
      ref={ref}
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- a div pill is intentional; role=status announces it politely
      role="status"
      className={cn(
        'inline-flex h-10 items-center gap-2 overflow-hidden rounded-figma-lg px-2 text-figma-body-medium shadow-figma-elevation-100',
        colors[color],
        className,
      )}
      {...props}
    />
  );
}

VisualBellRoot.displayName = 'VisualBellRoot';

interface VisualBellLabelProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * Leading 24px status icon.
   */
  icon?: React.ReactNode;
}

function VisualBellLabel({ icon, className, children, ref, ...props }: VisualBellLabelProps) {
  return (
    <span
      ref={ref}
      className={cn('flex items-center gap-1 font-figma-strong', className)}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}

VisualBellLabel.displayName = 'VisualBellLabel';

function VisualBellActions({ className, ref, ...props }: React.ComponentPropsWithRef<'span'>) {
  return (
    <span
      ref={ref}
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
}

VisualBellActions.displayName = 'VisualBellActions';

function VisualBellAction({
  className,
  ref,
  type = 'button',
  ...props
}: React.ComponentPropsWithRef<'button'>) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'flex h-6 items-center rounded-figma-md border border-(--bell-edge) px-2 text-figma-body-medium',
        'hover:bg-white/10 active:bg-white/15',
        className,
      )}
      {...props}
    />
  );
}

VisualBellAction.displayName = 'VisualBellAction';

function VisualBellDismiss({ className, ref, ...props }: React.ComponentPropsWithRef<'button'>) {
  return (
    <>
      <span className="w-px self-stretch bg-(--bell-edge)" />
      <button
        ref={ref}
        type="button"
        aria-label="Dismiss"
        className={cn(
          'flex size-6 items-center justify-center rounded-figma-md',
          'hover:bg-white/10 active:bg-white/15',
          className,
        )}
        {...props}
      >
        <CloseIcon size="6" />
      </button>
    </>
  );
}

VisualBellDismiss.displayName = 'VisualBellDismiss';

export {
  VisualBellRoot as Root,
  VisualBellLabel as Label,
  VisualBellActions as Actions,
  VisualBellAction as Action,
  VisualBellDismiss as Dismiss,
};
