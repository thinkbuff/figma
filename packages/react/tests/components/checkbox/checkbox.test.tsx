import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Checkbox } from '~/components/checkbox/checkbox';
import { Label } from '~/components/label';

import { firstArg } from '../../test-utils';

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
    await render(
      <Checkbox
        aria-label="Accept"
        checked
      />,
    );

    await expect
      .element(page.getByRole('checkbox', { name: 'Accept' }))
      .toHaveAttribute('aria-checked', 'true');
  });

  it('reports aria-checked="mixed" when indeterminate', async () => {
    await render(
      <Checkbox
        aria-label="Accept"
        indeterminate
      />,
    );

    await expect
      .element(page.getByRole('checkbox', { name: 'Accept' }))
      .toHaveAttribute('aria-checked', 'mixed');
  });

  it('does not toggle when disabled', async () => {
    const onCheckedChange = vi.fn<() => void>();
    await render(
      <Checkbox
        aria-label="Accept"
        disabled
        onCheckedChange={onCheckedChange}
      />,
    );

    const checkbox = page.getByRole('checkbox', { name: 'Accept' });
    await expect.element(checkbox).toBeDisabled();

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('calls onCheckedChange with the new state', async () => {
    const onCheckedChange = vi.fn<() => void>();
    await render(
      <Checkbox
        aria-label="Accept"
        onCheckedChange={onCheckedChange}
      />,
    );

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

describe('Checkbox variants', () => {
  it('muted renders a tertiary box with a secondary check', async () => {
    await render(
      <Checkbox
        aria-label="Muted"
        variant="muted"
        checked
        data-testid="muted"
      />,
    );

    const box = document.querySelector<HTMLElement>('[data-testid="muted"]')!;
    const probe = document.createElement('div');
    document.body.appendChild(probe);
    probe.style.backgroundColor = 'var(--figma-color-bg-tertiary)';
    const tertiary = getComputedStyle(probe).backgroundColor;
    probe.remove();

    expect(getComputedStyle(box).backgroundColor).toBe(tertiary);
  });

  it('ghost renders a dark icon-colored box', async () => {
    await render(
      <Checkbox
        aria-label="Ghost"
        variant="ghost"
        data-testid="ghost"
      />,
    );

    const box = document.querySelector<HTMLElement>('[data-testid="ghost"]')!;
    const probe = document.createElement('div');
    document.body.appendChild(probe);
    probe.style.backgroundColor = 'var(--figma-color-icon)';
    const iconColor = getComputedStyle(probe).backgroundColor;
    probe.remove();

    expect(getComputedStyle(box).backgroundColor).toBe(iconColor);
  });
});
