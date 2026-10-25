import { Tabs } from '@base-ui/react/tabs';

import { cn } from '~/utils';

interface TabsRootProps extends Omit<React.ComponentPropsWithRef<typeof Tabs.Root>, 'className'> {
  className?: string;
}

interface TabsListProps extends Omit<React.ComponentPropsWithRef<typeof Tabs.List>, 'className'> {
  className?: string;
}

interface TabsTriggerProps extends Omit<React.ComponentPropsWithRef<typeof Tabs.Tab>, 'className'> {
  className?: string;
}

interface TabsContentProps extends Omit<
  React.ComponentPropsWithRef<typeof Tabs.Panel>,
  'className'
> {
  className?: string;
}

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 *
 * - [Docs](https://base-ui.com/react/components/tabs)
 * - [API Reference](https://base-ui.com/react/components/tabs#api)
 */
const TabsRoot: React.FC<TabsRootProps> = ({ className, ref, ...props }) => (
  <Tabs.Root
    className={cn('bg-figma', className)}
    {...props}
    ref={ref}
  />
);

TabsRoot.displayName = 'Tabs';

const TabsList: React.FC<TabsListProps> = ({ className, ref, ...props }) => (
  <Tabs.List
    className={cn(
      'bg-figma',
      'inline-flex',
      'items-center',
      'justify-center',
      'border-b',
      'border-solid',
      'border-figma',
      className,
    )}
    {...props}
    ref={ref}
  />
);

TabsList.displayName = 'TabsList';

const TabsTrigger: React.FC<TabsTriggerProps> = ({ className, ref, ...props }) => (
  <Tabs.Tab
    className={cn(
      'inline-flex',
      'items-center',
      'justify-center',
      'px-3',
      'text-figma-sm leading-figma-sm',
      'text-figma-secondary',
      'bg-transparent',
      'hover:text-figma',
      'data-active:text-figma data-active:font-bold',
      'data-disabled:pointer-events-none',
      className,
    )}
    {...props}
    ref={ref}
  />
);

TabsTrigger.displayName = 'TabsTrigger';

const TabsContent: React.FC<TabsContentProps> = ({ className, ref, ...props }) => (
  <Tabs.Panel
    className={cn('bg-figma', className)}
    {...props}
    ref={ref}
  />
);

TabsContent.displayName = 'TabsContent';

export { TabsRoot as Root, TabsList as List, TabsTrigger as Trigger, TabsContent as Content };
