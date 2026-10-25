import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';

import { firstArg } from '~/test-utils';

import { Label } from '../label';

import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('toggles aria-checked on click', async () => {
    await render(<Checkbox aria-label="Accept" />);

    const checkbox = page.getByRole('checkbox', { name: 'Accept' });
    await expect.element(checkbox).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(checkbox);
    await expect.element(checkbox).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(checkbox);
    await expect.element(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles with Space key', async () => {
    await render(<Checkbox aria-label="Accept" />);

    const checkbox = page.getByRole('checkbox', { name: 'Accept' });
    (checkbox.element() as HTMLElement).focus();

    await userEvent.keyboard('{ }');
    await expect.element(checkbox).toHaveAttribute('aria-checked', 'true');

    await userEvent.keyboard('{ }');
    await expect.element(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('respects controlled checked', async () => {
    await render(<Checkbox aria-label="Accept" checked />);

    await expect.element(page.getByRole('checkbox', { name: 'Accept' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('reports aria-checked="mixed" when indeterminate', async () => {
    await render(<Checkbox aria-label="Accept" indeterminate />);

    await expect.element(page.getByRole('checkbox', { name: 'Accept' })).toHaveAttribute(
      'aria-checked',
      'mixed',
    );
  });

  it('does not toggle when disabled', async () => {
    const onCheckedChange = vi.fn();
    await render(<Checkbox aria-label="Accept" disabled onCheckedChange={onCheckedChange} />);

    const checkbox = page.getByRole('checkbox', { name: 'Accept' });
    await expect.element(checkbox).toBeDisabled();

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('calls onCheckedChange with the new state', async () => {
    const onCheckedChange = vi.fn();
    await render(<Checkbox aria-label="Accept" onCheckedChange={onCheckedChange} />);

    await userEvent.click(page.getByRole('checkbox', { name: 'Accept' }));

    expect(onCheckedChange).toHaveBeenCalledOnce();
    expect(firstArg(onCheckedChange)).toBe(true);
  });

  it('toggles when an associated label is clicked', async () => {
    await render(
      <>
        <Checkbox id="accept" />
        <Label htmlFor="accept">Accept terms</Label>
      </>,
    );

    const checkbox = page.getByRole('checkbox', { name: 'Accept terms' });
    await userEvent.click(page.getByText('Accept terms'));

    await expect.element(checkbox).toHaveAttribute('aria-checked', 'true');
  });
});
