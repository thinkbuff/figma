import { cn } from '~/utils';

function Label({ className, ref, ...props }: React.ComponentPropsWithRef<'label'>) {
  return (
    // oxlint-disable-next-line jsx-a11y/label-has-associated-control -- primitive; the caller associates via htmlFor or nesting
    <label
      ref={ref}
      className={cn(
        'text-figma-sm leading-figma-sm',
        'font-figma-default',
        'cursor-default',
        'disabled:cursor-not-allowed disabled:text-figma-disabled',
        'peer-disabled:cursor-not-allowed peer-disabled:text-figma-disabled',
        'peer-data-disabled:cursor-not-allowed peer-data-disabled:text-figma-disabled',
        className,
      )}
      {...props}
    />
  );
}

Label.displayName = 'Label';

export { Label };
