import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { firstArg } from '~/test-utils';

import { Select } from './index';

function Fixture(props: React.ComponentProps<typeof Select.Root>) {
  return (
    <Select.Root {...props}>
      <Select.Trigger aria-label="Fruit">
        <Select.Value placeholder="Pick a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

describe('Select', () => {
  it('renders a combobox trigger', async () => {
    await render(<Fixture />);

    await expect.element(page.getByRole('combobox', { name: 'Fruit' })).toBeVisible();
  });

  it('opens a listbox on click and selects an option', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('combobox', { name: 'Fruit' });
    await userEvent.click(trigger);

    await expect.element(page.getByRole('listbox')).toBeVisible();
    await userEvent.click(page.getByRole('option', { name: 'Banana' }));

    await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
    expect((trigger.element() as HTMLElement).textContent).toContain('Banana');
  });

  it('opens with the keyboard and selects with ArrowDown + Enter', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('combobox', { name: 'Fruit' });
    (trigger.element() as HTMLElement).focus();

    await userEvent.keyboard('{ArrowDown}');
    await expect.element(page.getByRole('listbox')).toBeVisible();

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
    expect((trigger.element() as HTMLElement).textContent).toContain('Banana');
  });

  it('closes on Escape', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('combobox', { name: 'Fruit' });
    await userEvent.click(trigger);
    await expect.element(page.getByRole('listbox')).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
    // NOTE: focus does not return to the trigger — SelectContent
    // intentionally preventDefaults onCloseAutoFocus (flagged delta).
  });

  it('does not open when the trigger is disabled', async () => {
    await render(
      <Select.Root disabled>
        <Select.Trigger aria-label="Fruit">
          <Select.Value placeholder="Pick a fruit" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = page.getByRole('combobox', { name: 'Fruit' });
    await expect.element(trigger).toBeDisabled();

    await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
  });

  it('calls onValueChange with the selected value', async () => {
    const onValueChange = vi.fn<() => void>();
    await render(<Fixture onValueChange={onValueChange} />);

    await userEvent.click(page.getByRole('combobox', { name: 'Fruit' }));
    await userEvent.click(page.getByRole('option', { name: 'Cherry' }));

    expect(onValueChange).toHaveBeenCalledOnce();
    expect(firstArg(onValueChange)).toBe('cherry');
  });
});
