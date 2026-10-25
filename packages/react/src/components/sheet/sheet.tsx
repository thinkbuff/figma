import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils';

type WithStringClassName<T> = Omit<T, 'className'> & { className?: string };

const SheetRoot = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof SheetPrimitive.Backdrop>>
> = ({ className, ref, ...props }) => (
  <SheetPrimitive.Backdrop
    ref={ref}
    className={cn(
      'fixed',
      'inset-0',
      'z-50',
      'bg-black/50',
      'backdrop-blur',
      'transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none',
      className,
    )}
    {...props}
  />
);

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
    WithStringClassName<React.ComponentPropsWithRef<typeof SheetPrimitive.Popup>>,
    VariantProps<typeof sheetVariants> {
  container?: React.ComponentProps<typeof SheetPrimitive.Portal>['container'];
}

/**
 * Extends the Dialog component to display content that complements the main content of the screen.
 *
 * - [Docs](https://base-ui.com/react/components/dialog)
 * - [API Reference](https://base-ui.com/react/components/dialog#api-reference)
 */
const SheetContent: React.FC<SheetContentProps> = ({
  className,
  children,
  container,
  side,
  ref,
  ...props
}) => {
  return (
    <SheetPortal container={container}>
      <SheetOverlay />
      <SheetPrimitive.Popup
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
};

SheetContent.displayName = 'SheetContent';

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
      'border-b',
      'border-solid',
      'border-figma',
      className,
    )}
    {...props}
  ></div>
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
      'border-t',
      'border-solid',
      'border-figma',
      className,
    )}
    {...props}
  ></div>
);

SheetFooter.displayName = 'SheetFooter';

const SheetTitle: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof SheetPrimitive.Title>>
> = ({ className, ref, ...props }) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-xs', 'text-figma', 'font-semibold', className)}
    {...props}
  />
);

SheetTitle.displayName = 'SheetTitle';

const SheetDescription: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof SheetPrimitive.Description>>
> = ({ className, ref, ...props }) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-figma-secondary', className)}
    {...props}
  />
);

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
