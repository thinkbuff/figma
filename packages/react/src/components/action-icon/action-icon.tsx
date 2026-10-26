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
}

function ActionIcon({ className, disabled, render, ref, ...props }: ActionIconProps) {
  return useRender({
    render,
    defaultTagName: 'button',
    ref,
    props: mergeProps<'button'>(
      {
        className: cn(
          'size-8',
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
            ? ['cursor-not-allowed', 'text-figma-icon-disabled', 'fill-figma-icon-disabled']
            : [
                'hover:bg-figma-pressed',
                'focus-visible:outline-figma-border-selected',
                'aria-expanded:bg-figma-selected aria-expanded:text-figma-icon-brand aria-expanded:fill-figma-icon-brand',
                'aria-expanded:hover:bg-figma-selected aria-expanded:hover:text-figma-icon-brand aria-expanded:hover:fill-figma-icon-brand',
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
