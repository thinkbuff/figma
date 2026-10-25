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
}

const ActionIcon: React.FC<ActionIconProps> = ({ className, disabled, render, ref, ...props }) => {
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
          'rounded-figma-sm',
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
            ? ['cursor-not-allowed', 'text-figma-disabled', 'fill-figma-icon-disabled']
            : [
                'hover:bg-figma-hover hover:text-figma-icon-hover hover:fill-figma-icon-hover',
                'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-figma-border-brand-strong',
                'aria-expanded:bg-figma-brand aria-expanded:text-figma-icon-onbrand aria-expanded:fill-figma-icon-onbrand',
                'aria-expanded:hover:bg-figma-brand aria-expanded:hover:text-figma-icon-onbrand aria-expanded:hover:fill-figma-icon-onbrand',
              ],
          className,
        ),
        disabled,
      },
      props,
    ),
  });
};

ActionIcon.displayName = 'ActionIcon';

export { ActionIcon };

export type { ActionIconProps };
