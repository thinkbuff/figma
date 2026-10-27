import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import {
  LinkTooltip,
  LinkTooltipAction,
  LinkTooltipInput,
  LinkTooltipItem,
  LinkTooltipPopup,
} from '~/components/link-tooltip/link-tooltip';
import { Root as PopoverRoot, Trigger as PopoverTrigger } from '~/components/popover';

describe('LinkTooltip', () => {
  it('renders the URL input row', async () => {
    const { container } = await render(
      <LinkTooltip>
        <LinkTooltipInput placeholder="Type or paste URL" />
      </LinkTooltip>,
    );
    expect(container.querySelector('input')).toHaveAttribute('placeholder', 'Type or paste URL');
  });

  it('renders action rows with dividers', async () => {
    const { container } = await render(
      <LinkTooltip arrow>
        <LinkTooltipItem icon={<svg data-testid="icon" />}>
          <LinkTooltipAction>Open google.com</LinkTooltipAction>
          <LinkTooltipAction>Edit</LinkTooltipAction>
        </LinkTooltipItem>
      </LinkTooltip>,
    );
    expect(container.querySelector('[data-testid=icon]')).toBeTruthy();
    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Open google.com');
    expect(buttons[1]).toHaveTextContent('Edit');
    expect(container.querySelector('svg[aria-hidden=true]')).toBeTruthy();
  });

  it('clips action hover backgrounds to the rounded corner', async () => {
    const { container } = await render(
      <LinkTooltip arrow>
        <LinkTooltipItem>
          <LinkTooltipAction>Open google.com</LinkTooltipAction>
          <LinkTooltipAction>Edit</LinkTooltipAction>
        </LinkTooltipItem>
      </LinkTooltip>,
    );
    const item = container.querySelector<HTMLElement>('.overflow-hidden');
    expect(item).toBeTruthy();
    const style = getComputedStyle(item!);
    expect(style.overflowX).toBe('hidden');
    expect(parseFloat(style.borderTopRightRadius)).toBeGreaterThan(0);
  });

  it('renders the popup anchored to the trigger with a side-aware arrow', async () => {
    await render(
      <PopoverRoot open>
        <PopoverTrigger render={<button>field</button>} />
        <LinkTooltipPopup side="bottom">
          <LinkTooltipItem>
            <LinkTooltipAction>Edit</LinkTooltipAction>
          </LinkTooltipItem>
        </LinkTooltipPopup>
      </PopoverRoot>,
    );
    const positioner = document.querySelector<HTMLElement>('[data-side]');
    expect(positioner).toBeTruthy();
    expect(positioner).toHaveAttribute('data-side', 'bottom');
    const buttons = document.querySelectorAll('[data-side] button');
    expect(buttons[0]).toHaveTextContent('Edit');
    expect(document.querySelector('[data-side] svg[aria-hidden=true]')).toBeTruthy();
  });
});
