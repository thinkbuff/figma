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
          icon: 'col-start-1 row-start-1 row-end-[-1] flex items-center pl-3 [&_svg]:size-4 [&_.sonner-loading-bar]:bg-figma-onbrand',
          content:
            'col-start-2 row-start-1 row-end-[-1] flex flex-col justify-center gap-0.5 px-3 py-2.5',
          title: 'text-figma-sm',
          description: 'text-figma-sm leading-figma-sm text-white/70',
          success: '[&_[data-icon]]:text-figma-success',
          info: '[&_[data-icon]]:text-figma-brand',
          warning: '[&_[data-icon]]:text-figma-warning',
          error: '[&_[data-icon]]:text-figma-danger',
          actionButton:
            'col-start-3 row-start-1 flex min-h-7 items-center justify-center self-stretch border-l border-white/15 px-4 font-medium text-figma-onbrand hover:bg-white/10 active:bg-white/15',
          cancelButton:
            'col-start-3 row-start-1 flex min-h-7 items-center justify-center self-stretch border-l border-white/15 px-4 font-medium text-figma-onbrand group-has-[[data-action]]:row-start-2 group-has-[[data-action]]:border-t hover:bg-white/10 active:bg-white/15',
          closeButton:
            'right-0 left-auto translate-x-[40%] -translate-y-[40%] border border-white/25 border-solid bg-figma-inverse text-figma-onbrand opacity-0 hover:bg-white/15 group-hover:opacity-100',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
