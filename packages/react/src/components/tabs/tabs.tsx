import { Tabs } from '@base-ui/react/tabs';
import * as React from 'react';

import { addClassName, useComposedRefs } from '~/utils';

interface TabsRootProps extends React.ComponentPropsWithRef<typeof Tabs.Root> {}

interface TabsListProps extends React.ComponentPropsWithRef<typeof Tabs.List> {}

interface TabsTriggerProps extends React.ComponentPropsWithRef<typeof Tabs.Tab> {}

interface TabsContentProps extends React.ComponentPropsWithRef<typeof Tabs.Panel> {}

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 *
 * - [Docs](https://base-ui.com/react/components/tabs)
 * - [API Reference](https://base-ui.com/react/components/tabs#api)
 */
function TabsRoot({ className, ref, ...props }: TabsRootProps) {
  return (
    <Tabs.Root
      className={addClassName(className, 'bg-figma')}
      {...props}
      ref={ref}
    />
  );
}

TabsRoot.displayName = 'Tabs';

function TabsList({ className, ref, ...props }: TabsListProps) {
  return (
    <Tabs.List
      className={addClassName(className, 'flex', 'gap-1', 'overflow-y-auto')}
      {...props}
      ref={ref}
    />
  );
}

TabsList.displayName = 'TabsList';

function TabsTrigger({ className, ref, ...props }: TabsTriggerProps) {
  // Freeze the measured width on mount so switching to the active (bolder)
  // weight doesn't shift siblings.
  const fixedWidthRef = React.useCallback((node: HTMLButtonElement | null) => {
    if (node !== null) {
      node.style.width = `${node.getBoundingClientRect().width}px`;
    }
  }, []);
  return (
    <Tabs.Tab
      ref={useComposedRefs(ref, fixedWidthRef)}
      className={addClassName(
        className,
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
      )}
      {...props}
    />
  );
}

TabsTrigger.displayName = 'TabsTrigger';

function TabsContent({ className, ref, ...props }: TabsContentProps) {
  return (
    <Tabs.Panel
      className={addClassName(className, 'bg-figma')}
      {...props}
      ref={ref}
    />
  );
}

TabsContent.displayName = 'TabsContent';

export { TabsRoot as Root, TabsList as List, TabsTrigger as Trigger, TabsContent as Content };
