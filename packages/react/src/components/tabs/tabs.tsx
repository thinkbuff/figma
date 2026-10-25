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
    className={cn('flex', 'gap-1', 'overflow-y-auto', className)}
    {...props}
    ref={ref}
  />
);

TabsList.displayName = 'TabsList';

const TabsTrigger: React.FC<TabsTriggerProps> = ({ className, ref, ...props }) => (
  <Tabs.Tab
    className={cn(
      'flex',
      'items-center',
      'justify-center',
      'shrink-0',
      'h-6',
      'px-2',
      'text-figma-sm leading-figma-sm',
      'font-figma-default',
      'text-figma-secondary',
      'fill-figma-icon-secondary',
      'whitespace-nowrap',
      'rounded-figma-md',
      'not-data-disabled:hover:bg-figma-secondary',
      'data-active:font-figma-strong data-active:text-figma data-active:fill-figma-icon data-active:bg-figma-secondary',
      'data-disabled:text-figma-disabled',
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
