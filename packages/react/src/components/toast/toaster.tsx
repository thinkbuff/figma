import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * An opinionated toast component for React.
 *
 * - [Docs](https://sonner.emilkowal.ski/)
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      visibleToasts={2}
      toastOptions={{
        // unstyled: true,
        classNames: {
          toast:
            'group toast flex items-center gap-2 p-3 font-size-11 bg-figma text-figma shadow-lg flex items-center border-solid border border-figma rounded-1 w-[var(--width)]',
          title: 'font-size-12',
          description: 'font-size-11 text-figma-secondary',
          actionButton:
            'group-[.toast]:bg-figma-brand group-[.toast]:text-figma-onbrand',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
