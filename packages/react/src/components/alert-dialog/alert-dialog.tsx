import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';

import { addClassName, cn } from '~/utils';

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogAction = AlertDialogPrimitive.Close;

const AlertDialogCancel = AlertDialogPrimitive.Close;

function AlertDialogOverlay({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Backdrop>) {
  return (
    <AlertDialogPrimitive.Backdrop
      ref={ref}
      className={addClassName(
        className,
        'fixed',
        'inset-0',
        'z-50',
        'bg-figma-overlay',
        'transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none',
      )}
      {...props}
    />
  );
}

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

interface AlertDialogContentProps extends React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Popup
> {
  container?: React.ComponentProps<typeof AlertDialogPrimitive.Portal>['container'];
}

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * - [Docs](https://base-ui.com/react/components/alert-dialog)
 * - [API Reference](https://base-ui.com/react/components/alert-dialog#api-reference)
 */
function AlertDialogContent({ className, container, ref, ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPortal container={container}>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        ref={ref}
        className={addClassName(
          className,
          'fixed',
          'grid',
          'w-full',
          'max-w-80',
          'left-1/2',
          'top-1/2',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'z-50',
          'rounded-figma-lg',
          'bg-figma',
          'p-4',
          'shadow-figma-modal',
          'outline-none',
          'transition-[opacity,scale] duration-150 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

AlertDialogContent.displayName = 'AlertDialogContent';

function AlertDialogHeader({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      ref={ref}
      className={cn('flex', 'items-center', 'pb-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

AlertDialogHeader.displayName = 'AlertDialogHeader';

function AlertDialogFooter({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      ref={ref}
      className={cn('flex', 'items-center', 'pt-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

AlertDialogFooter.displayName = 'AlertDialogFooter';

function AlertDialogTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={addClassName(
        className,
        'text-figma',
        'text-figma-body-medium',
        'font-figma-strong',
      )}
      {...props}
    />
  );
}

AlertDialogTitle.displayName = 'AlertDialogTitle';

function AlertDialogDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={addClassName(className, 'text-figma', 'text-figma-body-medium')}
      {...props}
    />
  );
}

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
