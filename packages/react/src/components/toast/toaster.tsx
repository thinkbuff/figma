import { Toaster as SonnerToaster } from 'sonner';

import { cn } from '~/utils';

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

/**
 * An opinionated toast component for React.
 *
 * - [Docs](https://sonner.emilkowal.ski/)
 */
function Toaster({ className, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      className={cn('toaster', className)}
      visibleToasts={2}
      gap={12}
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'group toast grid min-h-14 w-73 auto-rows-fr grid-cols-[auto_1fr_auto] items-stretch rounded-figma-md bg-figma-tooltip text-figma-sm leading-figma-sm text-figma-tooltip shadow-figma-elevation-400',
          icon: 'relative col-start-1 row-start-1 flex w-8 items-center justify-start self-stretch pl-2 [&_svg]:size-6 [&_.sonner-loading-wrapper]:inset-0 [&_.sonner-loading-wrapper]:m-auto [&_.sonner-spinner]:top-0 [&_.sonner-spinner]:left-0 [&_.sonner-loading-bar]:bg-figma-tooltip group-has-[[data-action]]:group-has-[[data-cancel]]:row-end-3',
          content:
            'col-start-2 row-start-1 flex flex-col justify-center gap-0.5 self-stretch pl-2 pr-1 py-2.5 group-has-[[data-icon]]:pl-1 group-has-[[data-action]]:group-has-[[data-cancel]]:row-end-3',
          title: 'text-figma-sm line-clamp-2',
          description: 'text-figma-sm leading-figma-sm text-figma-tooltip-secondary',
          success: '[&_[data-icon]]:text-figma-success',
          info: '[&_[data-icon]]:text-figma-brand',
          warning: '[&_[data-icon]]:text-figma-warning',
          error: '[&_[data-icon]]:text-figma-danger',
          actionButton:
            'col-start-3 row-start-1 flex w-18 items-center justify-center self-stretch border-l border-figma-tooltip px-2 font-figma-strong text-figma-tooltip hover:bg-figma-tooltip-hover active:bg-figma-tooltip-pressed',
          cancelButton:
            'col-start-3 row-start-1 flex w-18 items-center justify-center self-stretch border-l border-figma-tooltip px-2 font-figma-strong text-figma-tooltip group-has-[[data-action]]:row-start-2 group-has-[[data-action]]:border-t hover:bg-figma-tooltip-hover active:bg-figma-tooltip-pressed',
          closeButton: 'hidden',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
