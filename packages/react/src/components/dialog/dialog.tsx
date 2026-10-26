import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';

import { addClassName, cn } from '~/utils';

const DialogRoot = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

function DialogOverlay({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Backdrop>) {
  return (
    <DialogPrimitive.Backdrop
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

DialogOverlay.displayName = 'DialogOverlay';

interface DialogContentProps extends React.ComponentPropsWithRef<typeof DialogPrimitive.Popup> {
  container?: React.ComponentProps<typeof DialogPrimitive.Portal>['container'];
}

/**
 * A window overlaid on either the primary window or another dialog window, rendering the content
 * underneath inert.
 *
 * - [Docs](https://base-ui.com/react/components/dialog)
 * - [API Reference](https://base-ui.com/react/components/dialog#api-reference)
 */
function DialogContent({ className, container, ref, ...props }: DialogContentProps) {
  return (
    <DialogPortal container={container}>
      <DialogOverlay />
      <DialogPrimitive.Popup
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
          'p-6',
          'shadow-figma-modal',
          'outline-none',
          'transition-[opacity,scale] duration-150 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
        )}
        {...props}
      />
    </DialogPortal>
  );
}

DialogContent.displayName = 'DialogContent';

function DialogHeader({ className, children, ref, ...props }: React.ComponentPropsWithRef<'div'>) {
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

DialogHeader.displayName = 'DialogHeader';

function DialogFooter({ className, children, ref, ...props }: React.ComponentPropsWithRef<'div'>) {
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

DialogFooter.displayName = 'DialogFooter';

function DialogTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={addClassName(
        className,
        'text-figma',
        'text-figma-sm leading-figma-sm',
        'font-figma-strong',
      )}
      {...props}
    />
  );
}

DialogTitle.displayName = 'DialogTitle';

function DialogDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={addClassName(className, 'text-figma', 'text-figma-sm leading-figma-sm')}
      {...props}
    />
  );
}

DialogDescription.displayName = 'DialogDescription';

export {
  DialogRoot as Root,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogTrigger as Trigger,
  DialogContent as Content,
  DialogHeader as Header,
  DialogFooter as Footer,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogClose as Close,
};
