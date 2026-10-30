import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { cn } from '~/utils';

interface ActionIconProps extends Omit<React.ComponentPropsWithRef<'button'>, 'color'> {
  /**
   * Change the default rendered element to the one passed, merging their props and behavior.
   *
   * Read [Render](https://base-ui.com/react/utils/use-render) guide for more details.
   */
  render?: React.ReactElement;
  /**
   * Accessible name for the icon-only button.
   */
  'aria-label': string;
  /**
   * `secondary` draws the persistent translucent stroke from the UI3
   * `Button icon` spec.
   *
   * @default 'default'
   */
  variant?: 'default' | 'secondary';
  /**
   * The button size. `'small'` matches the UI3 `Button icon` spec (24px).
   *
   * @default 'small'
   */
  size?: 'small' | 'medium';
}

function ActionIcon({
  className,
  disabled,
  render,
  variant = 'default',
  size = 'small',
  ref,
  ...props
}: ActionIconProps) {
  return useRender({
    render,
    defaultTagName: 'button',
    ref,
    props: mergeProps<'button'>(
      {
        className: cn(
          size === 'small' ? 'size-6' : 'size-8',
          'icon-figma',
          'flex',
          'justify-center',
          'items-center',
          'shrink-0',
          'rounded-figma-md',
          'cursor-default',
          'appearance-none',
          'text-figma-icon',
          'fill-figma-icon',
          'bg-transparent',
          'bg-clip-border',
          'outline-solid',
          'outline-1',
          '-outline-offset-1',
          'outline-transparent',
          'transition-colors',
          'focus:not-focus-visible:outline-0 focus:not-focus-visible:outline-transparent',
          variant === 'secondary' && 'border border-solid border-figma-bordertranslucent',
          disabled
            ? [
                'cursor-not-allowed',
                'icon-figma-disabled',
                'text-figma-icon-disabled',
                'fill-figma-icon-disabled',
              ]
            : [
                'hover:bg-figma-bghovertransparent',
                'focus-visible:outline-figma-border-selected',
                variant === 'secondary'
                  ? 'not-aria-expanded:active:bg-figma-bghovertransparent'
                  : 'not-aria-expanded:active:bg-figma-bgtransparent-secondary-hover',
                'aria-expanded:bg-figma-selected aria-expanded:border-transparent',
                'aria-expanded:hover:bg-figma-selected-secondary',
                'aria-expanded:active:bg-figma-selected',
              ],
          className,
        ),
        disabled,
      },
      props,
    ),
  });
}

ActionIcon.displayName = 'ActionIcon';

export { ActionIcon };

export type { ActionIconProps };
