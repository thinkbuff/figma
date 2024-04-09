import { forwardRef } from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

const SheetRoot = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn([
      'fixed',
      'inset-0',
      'z-50',
      'bg-black',
      'bg-opacity-50',
      'backdrop-blur-2',
      'data-[state=open]:(animate-in fade-in-0)',
      'data-[state=closed]:(animate-out fade-out-0)',
      className,
    ])}
    {...props}
  />
));

SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  [
    'fixed',
    'z-50',
    'bg-figma',
    'focus:outline-none',
    'focus-visible:outline-none',
    'transition-all',
    'ease-in-out',
    'data-[state=open]:(animate-in animate-duration-240)',
    'data-[state=closed]:(animate-out animate-duration-120)',
  ],
  {
    variants: {
      side: {
        top: [
          'inset-x-0',
          'top-0',
          'data-[state=open]:slide-in-from-top',
          'data-[state=closed]:slide-out-to-top',
        ],
        bottom: [
          'inset-x-0',
          'bottom-0',
          'data-[state=open]:slide-in-from-bottom',
          'data-[state=closed]:slide-out-to-bottom',
        ],
        left: [
          'inset-y-0',
          'left-0',
          'h-full',
          'data-[state=open]:slide-in-from-left',
          'data-[state=closed]:slide-out-to-left',
        ],
        right: [
          'inset-y-0',
          'right-0',
          'h-full',
          'data-[state=open]:slide-in-from-right',
          'data-[state=closed]:slide-out-to-right',
        ],
      },
    },
    defaultVariants: {
      side: 'bottom',
    },
  },
);

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> {
  container?: SheetPrimitive.PortalProps['container'];
}

/**
 * Extends the Dialog component to display content that complements the main content of the screen.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/dialog)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/dialog#api-reference)
 */
const SheetContent = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, children, container, side, ...props }, ref) => {
  return (
    <SheetPortal container={container}>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});

SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex',
      'items-center',
      'px-4',
      'text-left',
      'min-h-10',
      'border-y',
      'border-solid',
      'border-figma',
      className,
    )}
    {...props}
  >
  </div>
);

SheetHeader.displayName = 'SheetHeader';

const SheetFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex',
      'items-center',
      'px-4',
      'text-left',
      'min-h-10',
      'border-y',
      'border-solid',
      'border-figma',
      className,
    )}
    {...props}
  >
  </div>
);

SheetFooter.displayName = 'SheetFooter';

const SheetTitle = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(['font-size-12', 'text-figma', 'font-semibold'], className)}
    {...props}
  />
));

SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-figma-secondary', className)}
    {...props}
  />
));

SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  SheetRoot as Root,
  SheetPortal as Portal,
  SheetOverlay as Overlay,
  SheetTrigger as Trigger,
  SheetClose as Close,
  SheetHeader as Header,
  SheetTitle as Title,
  SheetDescription as Description,
  SheetContent as Content,
  SheetFooter as Footer,
};
