import { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '~/utils';

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/tabs)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/tabs#api-reference)
 */
const TabsRoot = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    className={cn('bg-figma', className)}
    {...props}
    ref={ref}
  />
));

TabsRoot.displayName = TabsPrimitive.Root.displayName;

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
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
));

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
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
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn('bg-figma', className)}
    {...props}
    ref={ref}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  TabsRoot as Root,
  TabsList as List,
  TabsTrigger as Trigger,
  TabsContent as Content,
};
