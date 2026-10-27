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
            'group toast grid min-h-10 w-[var(--width)] auto-rows-fr grid-cols-[auto_1fr_auto] items-stretch rounded-figma-md bg-figma-inverse text-figma-sm leading-figma-sm text-figma-onbrand shadow-figma-elevation-400',
          icon: 'relative col-start-1 row-start-1 flex w-7 items-center justify-center self-stretch [&_svg]:size-4 [&_.sonner-loading-wrapper]:inset-0 [&_.sonner-loading-wrapper]:m-auto [&_.sonner-spinner]:top-0 [&_.sonner-spinner]:left-0 [&_.sonner-loading-bar]:bg-figma-onbrand group-has-[[data-action]]:group-has-[[data-cancel]]:row-end-3',
          content:
            'col-start-2 row-start-1 flex flex-col justify-center gap-0.5 self-stretch px-3 py-2.5 group-has-[[data-icon]]:pl-2 group-has-[[data-action]]:group-has-[[data-cancel]]:row-end-3',
          title: 'text-figma-sm line-clamp-2',
          description: 'text-figma-sm leading-figma-sm text-white/70',
          success: '[&_[data-icon]]:text-figma-success',
          info: '[&_[data-icon]]:text-figma-brand',
          warning: '[&_[data-icon]]:text-figma-warning',
          error: '[&_[data-icon]]:text-figma-danger',
          actionButton:
            'col-start-3 row-start-1 flex min-h-7 items-center justify-center self-stretch border-l border-white/15 px-4 font-medium text-figma-onbrand hover:bg-white/10 active:bg-white/15',
          cancelButton:
            'col-start-3 row-start-1 flex min-h-7 items-center justify-center self-stretch border-l border-white/15 px-4 font-medium text-figma-onbrand group-has-[[data-action]]:row-start-2 group-has-[[data-action]]:border-t hover:bg-white/10 active:bg-white/15',
          closeButton: 'hidden',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
