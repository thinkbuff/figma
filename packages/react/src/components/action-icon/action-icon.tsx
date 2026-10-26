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
   * The button size. `'small'` matches the UI3 `Button icon` spec (24px).
   *
   * @default 'small'
   */
  size?: 'small' | 'medium';
  /**
   * The look of the button when it is active (`aria-expanded`, e.g. it opened a
   * popup). `'subtle'` tints the icon and background; `'solid'` fills the
   * background.
   *
   * @default 'subtle'
   */
  activeAppearance?: 'subtle' | 'solid';
}

function ActionIcon({
  className,
  disabled,
  render,
  size = 'small',
  activeAppearance = 'subtle',
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
          'text-figma-icon',
          'fill-figma-icon',
          'text-figma-sm leading-figma-sm',
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
          disabled
            ? [
                'cursor-not-allowed',
                'icon-figma-disabled',
                'text-figma-icon-disabled',
                'fill-figma-icon-disabled',
              ]
            : [
                'hover:bg-figma-pressed',
                'focus-visible:outline-figma-border-selected',
                activeAppearance === 'subtle'
                  ? [
                      'aria-expanded:bg-figma-selected aria-expanded:icon-figma-brand',
                      'aria-expanded:hover:bg-figma-selected aria-expanded:hover:icon-figma-brand',
                    ]
                  : [
                      'aria-expanded:bg-figma-selected-strong aria-expanded:icon-figma-onbrand',
                      'aria-expanded:hover:bg-figma-selected-strong aria-expanded:hover:icon-figma-onbrand',
                    ],
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
