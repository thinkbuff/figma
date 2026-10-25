import { Popover as PopoverPrimitive } from '@base-ui/react/popover';

import { cn } from '~/utils';

const PopoverRoot = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

// Base UI has no Popover.Anchor equivalent — inert passthrough.
const PopoverAnchor: React.FC<React.ComponentPropsWithRef<'div'>> = (props) => <div {...props} />;

const PopoverClose = PopoverPrimitive.Close;

interface PopoverArrowProps extends Omit<
  React.ComponentPropsWithRef<typeof PopoverPrimitive.Arrow>,
  'className'
> {
  className?: string;
}

const PopoverArrow: React.FC<PopoverArrowProps> = ({ className, ref, ...props }) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn(
      'text-figma-border fill-figma-bg',
      'data-[side=bottom]:-top-1.75 data-[side=bottom]:rotate-180',
      'data-[side=top]:-bottom-1.75',
      'data-[side=left]:right-[-10.5px] data-[side=left]:-rotate-90',
      'data-[side=right]:left-[-10.5px] data-[side=right]:rotate-90',
      className,
    )}
    render={
      <svg
        width={14}
        height={7}
        viewBox="0 0 24 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="24"
          height="2"
        />
        <path
          d="M24 1C18 1 18 11 12 11C6 11 6 0.999999 8.74228e-07 0.999999"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    }
    {...props}
  />
);

PopoverArrow.displayName = 'PopoverArrow';

type PositionerProps = React.ComponentPropsWithRef<typeof PopoverPrimitive.Positioner>;

interface PopoverContentProps extends Omit<
  React.ComponentPropsWithRef<typeof PopoverPrimitive.Popup>,
  'className'
> {
  /**
   * Specify a container element to portal the content into.
   *
   * @default document.body
   */
  container?: React.ComponentProps<typeof PopoverPrimitive.Portal>['container'];
  className?: string;
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: PositionerProps['sideOffset'];
  alignOffset?: PositionerProps['alignOffset'];
  collisionPadding?: PositionerProps['collisionPadding'];
}

/**
 * Displays rich content in a portal, triggered by a button.
 *
 * - [Docs](https://base-ui.com/react/components/popover)
 * - [API Reference](https://base-ui.com/react/components/popover#api)
 */
const PopoverContent: React.FC<PopoverContentProps> = ({
  className,
  container,
  align = 'center',
  side,
  sideOffset = 4,
  alignOffset,
  collisionPadding,
  ref,
  ...props
}) => (
  <PopoverPrimitive.Portal container={container}>
    <PopoverPrimitive.Positioner
      className="z-50"
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      collisionPadding={collisionPadding}
    >
      <PopoverPrimitive.Popup
        ref={ref}
        className={cn(
          'w-auto',
          'bg-figma',
          'rounded-figma-sm',
          'outline-solid',
          'outline-1',
          'outline-figma-border',
          'shadow-md',
          'will-change-[transform,opacity]',
          'origin-(--transform-origin) transition-[opacity,scale] duration-100 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
);

PopoverContent.displayName = 'PopoverContent';

export {
  PopoverRoot as Root,
  PopoverTrigger as Trigger,
  PopoverContent as Content,
  PopoverArrow as Arrow,
  PopoverAnchor as Anchor,
  PopoverClose as Close,
};
