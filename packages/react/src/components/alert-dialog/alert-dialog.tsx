import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';

import { cn } from '~/utils';

type WithStringClassName<T> = Omit<T, 'className'> & { className?: string };

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogAction = AlertDialogPrimitive.Close;

const AlertDialogCancel = AlertDialogPrimitive.Close;

const AlertDialogOverlay: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Backdrop>>
> = ({ className, ref, ...props }) => (
  <AlertDialogPrimitive.Backdrop
    ref={ref}
    className={cn(
      'fixed',
      'inset-0',
      'z-50',
      'bg-black/50',
      'transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none',
      className,
    )}
    {...props}
  />
);

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

interface AlertDialogContentProps extends WithStringClassName<
  React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Popup>
> {
  container?: React.ComponentProps<typeof AlertDialogPrimitive.Portal>['container'];
}

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * - [Docs](https://base-ui.com/react/components/alert-dialog)
 * - [API Reference](https://base-ui.com/react/components/alert-dialog#api-reference)
 */
const AlertDialogContent: React.FC<AlertDialogContentProps> = ({
  className,
  container,
  ref,
  ...props
}) => (
  <AlertDialogPortal container={container}>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Popup
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
        'outline-none',
        'transition-[opacity,scale] duration-150 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
);

AlertDialogContent.displayName = 'AlertDialogContent';

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
  WithStringClassName<React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Title>>
> = ({ className, ref, ...props }) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-figma', 'text-sm leading-4', 'font-medium', className)}
    {...props}
  />
);

AlertDialogTitle.displayName = 'AlertDialogTitle';

const AlertDialogDescription: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Description>>
> = ({ className, ref, ...props }) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-figma', 'text-figma-sm leading-figma-sm', className)}
    {...props}
  />
);

AlertDialogDescription.displayName = 'AlertDialogDescription';

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
