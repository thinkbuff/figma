import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import {
  LinkTooltip,
  LinkTooltipAction,
  LinkTooltipInput,
  LinkTooltipItem,
} from '~/components/link-tooltip/link-tooltip';

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
});
