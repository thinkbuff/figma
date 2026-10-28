import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { createContext, useContext } from 'react';

import { ChevronDownIcon } from '~/icons';
import { cn } from '~/utils';

interface ActionIconSplitContextValue {
  size: 'small' | 'large';
  disabled?: boolean;
}

const ActionIconSplitContext = createContext<ActionIconSplitContextValue>({ size: 'small' });

interface ActionIconSplitProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * Change the default rendered element to the one passed, merging their props and behavior.
   *
   * Read [Render](https://base-ui.com/react/utils/use-render) guide for more details.
   */
  render?: React.ReactElement;
  /**
   * `'small'` is 41x24, `'large'` is 49x32 (UI3 `Button icon split` spec).
   *
   * @default 'small'
   */
  size?: 'small' | 'large';
  /**
   * Disables both halves.
   */
  disabled?: boolean;
}

/**
 * A split icon button (UI3 `Button icon split`): a primary action on the left
 * and a chevron trigger on the right for alternate options.
 */
function ActionIconSplit({
  className,
  render,
  size = 'small',
  disabled,
  ref,
  ...props
}: ActionIconSplitProps) {
  return (
    <ActionIconSplitContext.Provider value={{ size, disabled }}>
      {useRender({
        render,
        defaultTagName: 'div',
        ref,
        props: mergeProps<'div'>(
          { className: cn('inline-flex shrink-0 gap-px rounded-figma-md', className) },
          props,
        ),
      })}
    </ActionIconSplitContext.Provider>
  );
}

interface ActionIconSplitHalfProps extends Omit<
  React.ComponentPropsWithRef<'button'>,
  'color' | 'disabled'
> {
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

function ActionIconSplitHalf({
  className,
  rounded,
  width,
  render,
  ref,
  ...props
}: ActionIconSplitHalfProps & { rounded: 'l' | 'r'; width: 'icon' | 'chevron' }) {
  const { size, disabled } = useContext(ActionIconSplitContext);

  return useRender({
    render,
    defaultTagName: 'button',
    ref,
    props: mergeProps<'button'>(
      {
        className: cn(
          size === 'small' ? 'h-6' : 'h-8',
          width === 'icon' ? (size === 'small' ? 'w-6' : 'w-8') : 'w-4',
          rounded === 'l' ? 'rounded-l-figma-md' : 'rounded-r-figma-md',
          'icon-figma',
          'flex',
          'justify-center',
          'items-center',
          'shrink-0',
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
                'hover:bg-figma-bghovertransparent',
                'active:bg-figma-bgtransparent-secondary-hover',
                'focus-visible:outline-figma-border-selected',
                'aria-expanded:bg-figma-selected',
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

function ActionIconSplitButton(props: ActionIconSplitHalfProps) {
  return (
    <ActionIconSplitHalf
      rounded="l"
      width="icon"
      {...props}
    />
  );
}

function ActionIconSplitChevron({
  children = <ChevronDownIcon size="4" />,
  ...props
}: ActionIconSplitHalfProps) {
  return (
    <ActionIconSplitHalf
      rounded="r"
      width="chevron"
      {...props}
    >
      {children}
    </ActionIconSplitHalf>
  );
}

ActionIconSplit.displayName = 'ActionIconSplit';
ActionIconSplitButton.displayName = 'ActionIconSplitButton';
ActionIconSplitChevron.displayName = 'ActionIconSplitChevron';

export {
  ActionIconSplit as Root,
  ActionIconSplitButton as Button,
  ActionIconSplitChevron as Chevron,
};

export type { ActionIconSplitProps, ActionIconSplitHalfProps };
