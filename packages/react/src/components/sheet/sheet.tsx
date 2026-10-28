import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { cva, type VariantProps } from 'class-variance-authority';

import { addClassName, cn } from '~/utils';

const SheetRoot = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

function SheetOverlay({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SheetPrimitive.Backdrop>) {
  return (
    <SheetPrimitive.Backdrop
      ref={ref}
      className={addClassName(
        className,
        'fixed',
        'inset-0',
        'z-50',
        'bg-figma-overlay',
        'backdrop-blur',
        'transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none',
      )}
      {...props}
    />
  );
}

SheetOverlay.displayName = 'SheetOverlay';

const sheetVariants = cva(
  [
    'fixed',
    'z-50',
    'bg-figma',
    'border-solid',
    'border-figma',
    'focus:outline-none',
    'focus-visible:outline-none',
    'transition-all',
    'ease-in-out',
    'duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      side: {
        top: [
          'inset-x-0',
          'top-0',
          'border-b',
          'data-starting-style:-translate-y-full data-ending-style:-translate-y-full',
        ],
        bottom: [
          'inset-x-0',
          'bottom-0',
          'border-t',
          'data-starting-style:translate-y-full data-ending-style:translate-y-full',
        ],
        left: [
          'inset-y-0',
          'left-0',
          'h-full',
          'border-r',
          'data-starting-style:-translate-x-full data-ending-style:-translate-x-full',
        ],
        right: [
          'inset-y-0',
          'right-0',
          'h-full',
          'border-l',
          'data-starting-style:translate-x-full data-ending-style:translate-x-full',
        ],
      },
    },
    defaultVariants: {
      side: 'bottom',
    },
  },
);

export interface SheetContentProps
  extends
    React.ComponentPropsWithRef<typeof SheetPrimitive.Popup>,
    VariantProps<typeof sheetVariants> {
  container?: React.ComponentProps<typeof SheetPrimitive.Portal>['container'];
}

/**
 * Extends the Dialog component to display content that complements the main content of the screen.
 *
 * - [Docs](https://base-ui.com/react/components/dialog)
 * - [API Reference](https://base-ui.com/react/components/dialog#api-reference)
 */
function SheetContent({ className, children, container, side, ref, ...props }: SheetContentProps) {
  return (
    <SheetPortal container={container}>
      <SheetOverlay />
      <SheetPrimitive.Popup
        ref={ref}
        className={addClassName(className, sheetVariants({ side }))}
        {...props}
      >
        {children}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

SheetContent.displayName = 'SheetContent';

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'px-4',
        'text-left',
        'min-h-10',
        'border-b',
        'border-solid',
        'border-figma',
        className,
      )}
      {...props}
    ></div>
  );
}

SheetHeader.displayName = 'SheetHeader';

function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'px-4',
        'text-left',
        'min-h-10',
        'border-t',
        'border-solid',
        'border-figma',
        className,
      )}
      {...props}
    ></div>
  );
}

SheetFooter.displayName = 'SheetFooter';

function SheetTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
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

SheetTitle.displayName = 'SheetTitle';

function SheetDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      ref={ref}
      className={addClassName(className, 'text-figma-secondary')}
      {...props}
    />
  );
}

SheetDescription.displayName = 'SheetDescription';

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
