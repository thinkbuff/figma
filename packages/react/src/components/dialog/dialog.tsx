import { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '~/utils';

const DialogRoot = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed',
      'inset-0',
      'z-50',
      'bg-black/50',
      'data-[state=open]:(animate-in fade-in-0)',
      'data-[state=closed]:(animate-out fade-out-0)',
      className,
    )}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  container?: DialogPrimitive.DialogPortalProps['container'];
}

/**
 * A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/dialog)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/dialog#api-reference)
 */
const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, container, ...props }, ref) => (
  <DialogPortal container={container}>
    <DialogOverlay />
    <DialogPrimitive.Content
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
        'rounded-0.5',
        'bg-figma',
        'p-6',
        'shadow-lg',
        'data-[state=open]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-12/25)',
        'data-[state=closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-12/25)',
        'animate-duration-200',
        className,
      )}
      {...props}
    />
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex', 'items-center', 'pb-6', className)}
    {...props}
  >
    {children}
  </div>
));

DialogHeader.displayName = 'DialogHeader';

const DialogFooter = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex', 'items-center', 'pt-6', className)}
    {...props}
  >
    {children}
  </div>
));

DialogFooter.displayName = 'DialogFooter';

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-figma', 'font-size-14', 'font-medium', className)}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-figma', 'font-size-11', className)}
    {...props}
  />
));

DialogDescription.displayName = DialogPrimitive.Description.displayName;

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
