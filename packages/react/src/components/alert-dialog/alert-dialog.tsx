import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '~/utils';

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogAction = AlertDialogPrimitive.Action;

const AlertDialogCancel = AlertDialogPrimitive.Cancel;

const AlertDialogOverlay: React.FC<
  React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Overlay>
> = ({ className, ref, ...props }) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn('fixed', 'inset-0', 'z-50', 'bg-black/50', className)}
    {...props}
  />
);

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

interface AlertDialogContentProps extends React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Content
> {
  container?: AlertDialogPrimitive.AlertDialogPortalProps['container'];
}

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/alert-dialog)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/alert-dialog#api-reference)
 */
const AlertDialogContent: React.FC<AlertDialogContentProps> = ({
  className,
  container,
  ref,
  ...props
}) => (
  <AlertDialogPortal container={container}>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed',
        'grid',
        'w-full',
        'max-w-80',
        'left-1/2',
        'top-1/2',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'z-50',
        'rounded-figma-sm',
        'bg-figma',
        'p-6',
        'shadow-lg',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
);

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  children,
  ref,
  ...props
}) => (
  <div
    ref={ref}
    className={cn('flex', 'items-center', 'pb-6', className)}
    {...props}
  >
    {children}
  </div>
);

AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  children,
  ref,
  ...props
}) => (
  <div
    ref={ref}
    className={cn('flex', 'items-center', 'pt-6', className)}
    {...props}
  >
    {children}
  </div>
);

AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle: React.FC<
  React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Title>
> = ({ className, ref, ...props }) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-figma', 'text-sm leading-4', 'font-medium', className)}
    {...props}
  />
);

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription: React.FC<
  React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Description>
> = ({ className, ref, ...props }) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-figma', 'text-figma-sm leading-figma-sm', className)}
    {...props}
  />
);

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

export {
  AlertDialogRoot as Root,
  AlertDialogPortal as Portal,
  AlertDialogOverlay as Overlay,
  AlertDialogTrigger as Trigger,
  AlertDialogContent as Content,
  AlertDialogHeader as Header,
  AlertDialogFooter as Footer,
  AlertDialogTitle as Title,
  AlertDialogDescription as Description,
  AlertDialogAction as Action,
  AlertDialogCancel as Cancel,
};
