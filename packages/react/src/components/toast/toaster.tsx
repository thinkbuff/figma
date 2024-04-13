import { Toaster as SonnerToaster } from 'sonner';

import { buttonVariants } from '../button/button-variants';
import { cn } from '../../utils';

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

/**
 * An opinionated toast component for React.
 *
 * - [Docs](https://sonner.emilkowal.ski/)
 */
const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      className={cn('toaster', 'group', className)}
      visibleToasts={2}
      gap={12}
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'group toast flex items-center gap-2 p-3 font-size-11 bg-figma text-figma shadow-lg flex items-center border-solid border border-figma rounded-1 w-[var(--width)]',
          title: 'font-size-12',
          description: 'font-size-11 text-figma-secondary group-data-[type=success]:text-figma-success-tertiary group-data-[type=info]:text-figma-brand-tertiary group-data-[type=warning]:text-figma-warning-tertiary group-data-[type=error]:text-figma-danger-tertiary dark:group-data-[type=warning]:text-figma-onwarning dark:group-data-[type=danger]:text-figma-ondanger',
          success: 'bg-figma-success-tertiary text-figma-success border-figma-success',
          info: 'bg-figma-brand-tertiary text-figma-brand border-figma-brand',
          warning: 'bg-figma-warning-tertiary text-figma-warning border-figma-warning dark:(bg-figma-warning-secondary text-figma-onwarning border-figma-onwarning)',
          error: 'bg-figma-danger-tertiary text-figma-danger border-figma-danger dark:(bg-figma-danger-secondary text-figma-ondanger border-figma-ondanger)',
          actionButton: cn(buttonVariants({ color: 'secondary' }), 'h-7 ml-auto'),
          cancelButton: cn(buttonVariants({ color: 'secondary' }), 'h-7 ml-auto'),
          closeButton: 'text-figma cursor-default bg-figma-secondary hover:bg-figma-tertiary! active:bg-figma-tertiary! border border-solid border-figma right-0 left-unset translate-x-2/5 -translate-y-2/5 opacity-0 group-hover:opacity-100',
          icon: '[&_.sonner-loading-bar]:bg-figma-text',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
