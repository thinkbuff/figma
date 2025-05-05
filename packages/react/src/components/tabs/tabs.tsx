import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '~/utils';

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/tabs)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/tabs#api-reference)
 */
const TabsRoot: React.FC<React.ComponentPropsWithRef<typeof TabsPrimitive.Root>> = ({
  className,
  ref,
  ...props
}) => (
  <TabsPrimitive.Root
    className={cn('bg-figma', className)}
    {...props}
    ref={ref}
  />
);

TabsRoot.displayName = TabsPrimitive.Root.displayName;

const TabsList: React.FC<React.ComponentPropsWithRef<typeof TabsPrimitive.List>> = ({
  className,
  ref,
  ...props
}) => (
  <TabsPrimitive.List
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

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger: React.FC<React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger>> = ({
  className,
  ref,
  ...props
}) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex',
      'items-center',
      'justify-center',
      'px-3',
      'font-size-11',
      'text-figma-secondary',
      'bg-transparent',
      'hover:text-figma',
      'data-[state=active]:(text-figma font-bold)',
      'disabled:pointer-events-none',
      className,
    )}
    {...props}
    ref={ref}
  />
);

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent: React.FC<React.ComponentPropsWithRef<typeof TabsPrimitive.Content>> = ({
  className,
  ref,
  ...props
}) => (
  <TabsPrimitive.Content
    className={cn('bg-figma', className)}
    {...props}
    ref={ref}
  />
);

TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  TabsRoot as Root,
  TabsList as List,
  TabsTrigger as Trigger,
  TabsContent as Content,
};
