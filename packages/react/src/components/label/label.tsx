import { cn } from '~/utils';

const Label: React.FC<React.ComponentPropsWithRef<'label'>> = ({ className, ref, ...props }) => (
  <label
    ref={ref}
    className={cn(
      'text-figma-sm leading-figma-sm',
      'font-medium',
      'cursor-default',
      'disabled:cursor-not-allowed disabled:text-figma-disabled',
      'peer-disabled:cursor-not-allowed peer-disabled:text-figma-disabled',
      className,
    )}
    {...props}
  />
);

Label.displayName = 'Label';

export { Label };
