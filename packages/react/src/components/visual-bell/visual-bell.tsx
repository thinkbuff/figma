import { CloseIcon } from '~/icons';
import { cn } from '~/utils';

type VisualBellColor = 'default' | 'danger' | 'brand' | 'success' | 'component';

const colors: Record<VisualBellColor, string> = {
  default: 'bg-figma-inverse text-figma-onbrand',
  danger: 'bg-figma-danger text-figma-ondanger',
  brand: 'bg-figma-brand text-figma-onbrand',
  success: 'bg-figma-success text-figma-onsuccess',
  component: 'bg-figma-component text-figma-oncomponent',
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
        'inline-flex h-8 items-center gap-2 overflow-hidden rounded-full pl-3 pr-1 text-figma-sm leading-figma-sm shadow-figma-elevation-400',
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
   * Leading 16px status icon.
   */
  icon?: React.ReactNode;
}

function VisualBellLabel({ icon, className, children, ref, ...props }: VisualBellLabelProps) {
  return (
    <span
      ref={ref}
      className={cn('flex items-center gap-1', className)}
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
      className={cn('flex items-center gap-1', className)}
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
        'flex h-6 items-center rounded-figma-md border border-white/25 px-2 text-figma-sm leading-figma-sm',
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
      <span className="mx-0.5 w-px self-stretch bg-white/20" />
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
        <CloseIcon size="4" />
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
