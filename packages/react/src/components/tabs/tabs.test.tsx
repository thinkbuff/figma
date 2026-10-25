import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Tabs } from './index';

function Fixture() {
  return (
    <Tabs.Root defaultValue="a">
      <Tabs.List aria-label="Tabs">
        <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
        <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        <Tabs.Trigger
          disabled
          value="c"
        >
          Tab C
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="a">Content A</Tabs.Content>
      <Tabs.Content value="b">Content B</Tabs.Content>
      <Tabs.Content value="c">Content C</Tabs.Content>
    </Tabs.Root>
  );
}

describe('Tabs', () => {
  it('shows the default tab panel', async () => {
    await render(<Fixture />);

    await expect
      .element(page.getByRole('tab', { name: 'Tab A' }))
      .toHaveAttribute('aria-selected', 'true');
    await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Content A');
  });

  it('activates a tab on click and shows its panel', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('tab', { name: 'Tab B' }));

    await expect
      .element(page.getByRole('tab', { name: 'Tab B' }))
      .toHaveAttribute('aria-selected', 'true');
    await expect
      .element(page.getByRole('tab', { name: 'Tab A' }))
      .toHaveAttribute('aria-selected', 'false');
    await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Content B');
  });

  it('moves focus with arrow keys', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('tab', { name: 'Tab A' }));
    await userEvent.keyboard('{ArrowRight}');

    await expect.element(page.getByRole('tab', { name: 'Tab B' })).toHaveFocus();
  });

  it('cannot select a disabled tab', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('tab', { name: 'Tab A' }));
    // Base UI: disabled tabs stay in the arrow-key order (focusable, aria-disabled) but cannot be selected.
    await userEvent.keyboard('{ArrowLeft}');

    await expect
      .element(page.getByRole('tab', { name: 'Tab C' }))
      .toHaveAttribute('aria-disabled', 'true');
    await expect
      .element(page.getByRole('tab', { name: 'Tab C' }))
      .toHaveAttribute('aria-selected', 'false');
    await expect
      .element(page.getByRole('tab', { name: 'Tab A' }))
      .toHaveAttribute('aria-selected', 'true');
  });
});
