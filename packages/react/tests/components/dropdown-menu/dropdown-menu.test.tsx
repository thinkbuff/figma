import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { DropdownMenu } from '~/components/dropdown-menu/index';

import { clickForce, firstArg } from '../../test-utils';

function Fixture({
  onSelect,
  onCheckedChange,
  onSwitchChange,
  onRadioChange,
  checked = true,
  radioValue = 'a',
}: {
  onSelect?: () => void;
  onCheckedChange?: (checked: boolean) => void;
  onSwitchChange?: (checked: boolean) => void;
  onRadioChange?: (value: string) => void;
  checked?: boolean;
  radioValue?: string;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={onSelect}>Undo</DropdownMenu.Item>
        <DropdownMenu.Item
          disabled
          onClick={onSelect}
        >
          Redo
        </DropdownMenu.Item>
        <DropdownMenu.CheckboxItem
          checked={checked}
          onCheckedChange={onCheckedChange}
        >
          Show grid
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.ItemSwitch
          defaultChecked
          onCheckedChange={onSwitchChange}
        >
          Toggle row
        </DropdownMenu.ItemSwitch>
        <DropdownMenu.RadioGroup
          value={radioValue}
          onValueChange={onRadioChange}
        >
          <DropdownMenu.RadioItem value="a">Layout A</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="b">Layout B</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More tools</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Save page</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

describe('DropdownMenu', () => {
  it('opens a menu on trigger click', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('button', { name: 'Open menu' });
    const triggerEl = trigger.element() as HTMLElement;
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);

    // while the modal menu is open the trigger is hidden from the
    // accessibility tree, so assert on the captured element
    expect(triggerEl.getAttribute('aria-expanded')).toBe('true');
    await expect.element(page.getByRole('menu')).toBeVisible();
  });

  it('fires the item handler on click', async () => {
    const onSelect = vi.fn<() => void>();
    await render(<Fixture onSelect={onSelect} />);

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));
    await userEvent.click(page.getByRole('menuitem', { name: 'Undo' }));

    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('closes the menu after an item click (expected behavior)', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));
    await userEvent.click(page.getByRole('menuitem', { name: 'Undo' }));

    await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
  });

  it('toggles a checkbox item', async () => {
    const onCheckedChange = vi.fn<() => void>();
    await render(
      <Fixture
        checked
        onCheckedChange={onCheckedChange}
      />,
    );

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));

    const item = page.getByRole('menuitemcheckbox', { name: 'Show grid' });
    await expect.element(item).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(item);
    expect(onCheckedChange).toHaveBeenCalledOnce();
    expect(firstArg(onCheckedChange)).toBe(false);
  });

  it('toggles a switch item without closing the menu', async () => {
    const onSwitchChange = vi.fn<(checked: boolean) => void>();
    await render(<Fixture onSwitchChange={onSwitchChange} />);

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));

    const item = page.getByRole('menuitemcheckbox', { name: 'Toggle row' });
    await expect.element(item).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(item);
    expect(onSwitchChange).toHaveBeenCalledOnce();
    expect(firstArg(onSwitchChange)).toBe(false);

    await expect.element(page.getByRole('menu')).toBeVisible();
    await expect.element(item).toHaveAttribute('aria-checked', 'false');
  });

  it('renders radio items with checked state', async () => {
    await render(<Fixture radioValue="b" />);

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));

    await expect
      .element(page.getByRole('menuitemradio', { name: 'Layout B' }))
      .toHaveAttribute('aria-checked', 'true');
    await expect
      .element(page.getByRole('menuitemradio', { name: 'Layout A' }))
      .toHaveAttribute('aria-checked', 'false');
  });

  it('opens a submenu with ArrowRight', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));

    const subTrigger = page.getByRole('menuitem', { name: 'More tools' });
    (subTrigger.element() as HTMLElement).focus();
    await userEvent.keyboard('{ArrowRight}');

    await expect.element(page.getByRole('menuitem', { name: 'Save page' })).toBeVisible();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('button', { name: 'Open menu' });
    await userEvent.click(trigger);
    await expect.element(page.getByRole('menu')).toBeVisible();

    await userEvent.keyboard('{Escape}');

    await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it('does not fire the handler for a disabled item', async () => {
    const onSelect = vi.fn<() => void>();
    await render(<Fixture onSelect={onSelect} />);

    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));

    const disabled = page.getByRole('menuitem', { name: 'Redo' });
    await expect.element(disabled).toHaveAttribute('aria-disabled', 'true');

    await clickForce(disabled);

    expect(onSelect).not.toHaveBeenCalled();
  });
});
