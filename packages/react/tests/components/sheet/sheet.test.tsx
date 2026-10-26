import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Button } from '~/components/button';
import { Sheet } from '~/components/sheet/index';

import { firstArg } from '../../test-utils';

function Fixture({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Sheet.Root
      onOpenChange={onOpenChange}
      open={open}
    >
      <Sheet.Trigger render={<Button variant="outline">Open sheet</Button>} />
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Sheet title</Sheet.Title>
          <Sheet.Close render={<Button variant="outline">Close</Button>} />
        </Sheet.Header>
        <Sheet.Description>Sheet description goes here.</Sheet.Description>
      </Sheet.Content>
    </Sheet.Root>
  );
}

describe('Sheet', () => {
  it('opens a dialog with an accessible name and description', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Open sheet' }));

    const dialog = page.getByRole('dialog', { name: 'Sheet title' });
    await expect.element(dialog).toBeVisible();
    await expect
      .element(dialog)
      .toContainElement(page.getByText('Sheet description goes here.').element() as HTMLElement);
  });

  it('moves focus inside the sheet on open', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Open sheet' }));
    await expect.element(page.getByRole('dialog')).toBeVisible();

    const dialog = page.getByRole('dialog').element() as HTMLElement;
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it('closes on Escape', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Open sheet' }));
    await expect.element(page.getByRole('dialog')).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes via the close button and returns focus to the trigger', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('button', { name: 'Open sheet' });
    await userEvent.click(trigger);
    await userEvent.click(page.getByRole('button', { name: 'Close' }));

    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it('supports controlled open with onOpenChange', async () => {
    const onOpenChange = vi.fn<() => void>();
    const screen = await render(
      <Fixture
        onOpenChange={onOpenChange}
        open={false}
      />,
    );

    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();

    await screen.rerender(
      <Fixture
        onOpenChange={onOpenChange}
        open
      />,
    );
    await expect.element(page.getByRole('dialog', { name: 'Sheet title' })).toBeVisible();

    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalled();
    expect(firstArg(onOpenChange)).toBe(false);
  });
});
