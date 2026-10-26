import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';

import { cn } from '~/utils';

type WithStringClassName<T> = Omit<T, 'className'> & { className?: string };

const DialogRoot = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof DialogPrimitive.Backdrop>>
> = ({ className, ref, ...props }) => (
  <DialogPrimitive.Backdrop
    ref={ref}
    className={cn(
      'fixed',
      'inset-0',
      'z-50',
      'bg-figma-overlay',
      'transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none',
      className,
    )}
    {...props}
  />
);

DialogOverlay.displayName = 'DialogOverlay';

interface DialogContentProps extends WithStringClassName<
  React.ComponentPropsWithRef<typeof DialogPrimitive.Popup>
> {
  container?: React.ComponentProps<typeof DialogPrimitive.Portal>['container'];
}

/**
 * A window overlaid on either the primary window or another dialog window, rendering the content
 * underneath inert.
 *
 * - [Docs](https://base-ui.com/react/components/dialog)
 * - [API Reference](https://base-ui.com/react/components/dialog#api-reference)
 */
const DialogContent: React.FC<DialogContentProps> = ({ className, container, ref, ...props }) => (
  <DialogPortal container={container}>
    <DialogOverlay />
    <DialogPrimitive.Popup
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
        'rounded-figma-lg',
        'bg-figma',
        'p-6',
        'shadow-figma-modal',
        'outline-none',
        'transition-[opacity,scale] duration-150 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  </DialogPortal>
);

DialogContent.displayName = 'DialogContent';

const DialogHeader: React.FC<React.ComponentPropsWithRef<'div'>> = ({
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

DialogHeader.displayName = 'DialogHeader';

const DialogFooter: React.FC<React.ComponentPropsWithRef<'div'>> = ({
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

DialogFooter.displayName = 'DialogFooter';

const DialogTitle: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof DialogPrimitive.Title>>
> = ({ className, ref, ...props }) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-figma', 'text-figma-sm leading-figma-sm', 'font-figma-strong', className)}
    {...props}
  />
);

DialogTitle.displayName = 'DialogTitle';

const DialogDescription: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof DialogPrimitive.Description>>
> = ({ className, ref, ...props }) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-figma', 'text-figma-sm leading-figma-sm', className)}
    {...props}
  />
);

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
