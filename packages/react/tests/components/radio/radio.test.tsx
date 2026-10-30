import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Radio } from '~/components/radio/index';

import { firstArg, pressKey } from '../../test-utils';

function Fixture(props: React.ComponentProps<typeof Radio.Group>) {
  return (
    <Radio.Group {...props}>
      <Radio.GroupItem
        aria-label="Option A"
        value="a"
      />
      <Radio.GroupItem
        aria-label="Option B"
        value="b"
      />
      <Radio.GroupItem
        aria-label="Option C"
        value="c"
      />
    </Radio.Group>
  );
}

describe('Radio', () => {
  it('renders a radiogroup with radios', async () => {
    await render(<Fixture />);

    await expect.element(page.getByRole('radiogroup')).toBeVisible();
    await expect.element(page.getByRole('radio', { name: 'Option A' })).toBeVisible();
    await expect.element(page.getByRole('radio', { name: 'Option B' })).toBeVisible();
    await expect.element(page.getByRole('radio', { name: 'Option C' })).toBeVisible();
  });

  it('selects a radio on click', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('radio', { name: 'Option B' }));

    await expect
      .element(page.getByRole('radio', { name: 'Option B' }))
      .toHaveAttribute('aria-checked', 'true');
    await expect
      .element(page.getByRole('radio', { name: 'Option A' }))
      .toHaveAttribute('aria-checked', 'false');
  });

  it('moves selection with arrow keys', async () => {
    await render(<Fixture defaultValue="a" />);

    (page.getByRole('radio', { name: 'Option A' }).element() as HTMLElement).focus();
    pressKey('ArrowDown');

    await expect
      .element(page.getByRole('radio', { name: 'Option B' }))
      .toHaveAttribute('aria-checked', 'true');

    pressKey('ArrowDown');
    await expect
      .element(page.getByRole('radio', { name: 'Option C' }))
      .toHaveAttribute('aria-checked', 'true');
  });

  it('skips disabled items during keyboard navigation', async () => {
    await render(
      <Radio.Group defaultValue="a">
        <Radio.GroupItem
          aria-label="Option A"
          value="a"
        />
        <Radio.GroupItem
          aria-label="Option B"
          disabled
          value="b"
        />
        <Radio.GroupItem
          aria-label="Option C"
          value="c"
        />
      </Radio.Group>,
    );

    (page.getByRole('radio', { name: 'Option A' }).element() as HTMLElement).focus();
    pressKey('ArrowDown');

    await expect
      .element(page.getByRole('radio', { name: 'Option C' }))
      .toHaveAttribute('aria-checked', 'true');
    await expect
      .element(page.getByRole('radio', { name: 'Option B' }))
      .toHaveAttribute('aria-checked', 'false');
  });

  it('respects defaultValue', async () => {
    await render(<Fixture defaultValue="b" />);

    await expect
      .element(page.getByRole('radio', { name: 'Option B' }))
      .toHaveAttribute('aria-checked', 'true');
  });

  it('calls onValueChange with the selected value', async () => {
    const onValueChange = vi.fn<() => void>();
    await render(<Fixture onValueChange={onValueChange} />);

    await userEvent.click(page.getByRole('radio', { name: 'Option C' }));

    expect(onValueChange).toHaveBeenCalledOnce();
    expect(firstArg(onValueChange)).toBe('c');
  });
});

describe('RadioGroupItem checked state', () => {
  it('renders the dot via the root background and the border gap', async () => {
    await render(
      <Radio.Group defaultValue="a">
        <Radio.GroupItem
          aria-label="Option A"
          value="a"
          data-testid="checked-radio"
        />
        <Radio.GroupItem
          aria-label="Option B"
          value="b"
          data-testid="unchecked-radio"
        />
      </Radio.Group>,
    );

    const checked = document.querySelector<HTMLElement>('[data-testid="checked-radio"]')!;
    const unchecked = document.querySelector<HTMLElement>('[data-testid="unchecked-radio"]')!;

    const probe = document.createElement('div');
    document.body.appendChild(probe);
    probe.style.backgroundColor = 'var(--figma-color-icon)';
    const iconColor = getComputedStyle(probe).backgroundColor;
    probe.style.backgroundColor = 'var(--figma-color-bg)';
    const bgColor = getComputedStyle(probe).backgroundColor;
    probe.remove();

    // checked: the 8px padding box is the icon-colored dot, the 4px border is the bg-colored gap
    expect(getComputedStyle(checked).backgroundColor).toBe(iconColor);
    expect(getComputedStyle(checked).borderColor).toBe(bgColor);
    // unchecked: fully bg-colored inside the icon-colored outline ring
    expect(getComputedStyle(unchecked).backgroundColor).toBe(bgColor);
  });
});

describe('RadioGroupItem button variant', () => {
  it('renders a pill label radio that checks on click', async () => {
    await render(
      <Radio.Group defaultValue="a">
        <Radio.GroupItem
          value="a"
          variant="button"
        >
          Alpha
        </Radio.GroupItem>
        <Radio.GroupItem
          value="b"
          variant="button"
        >
          Beta
        </Radio.GroupItem>
      </Radio.Group>,
    );

    const alpha = page.getByRole('radio', { name: 'Alpha' });
    const beta = page.getByRole('radio', { name: 'Beta' });
    await expect.element(alpha).toBeVisible();
    await expect.element(alpha).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(beta);
    await expect.element(beta).toHaveAttribute('aria-checked', 'true');
    await expect.element(alpha).toHaveAttribute('aria-checked', 'false');
  });

  it('applies the selected fill and border when checked', async () => {
    await render(
      <Radio.Group defaultValue="a">
        <Radio.GroupItem
          value="a"
          variant="button"
          data-testid="pill"
        />
        ,
      </Radio.Group>,
    );

    const pill = document.querySelector<HTMLElement>('[data-testid="pill"]')!;
    const probe = document.createElement('div');
    document.body.appendChild(probe);
    probe.style.backgroundColor = 'var(--figma-color-bg-selected)';
    const selectedBg = getComputedStyle(probe).backgroundColor;
    probe.style.borderColor = 'var(--figma-color-border-brand)';
    const brandBorder = getComputedStyle(probe).borderColor;
    probe.remove();

    const style = getComputedStyle(pill);
    expect(style.backgroundColor).toBe(selectedBg);
    expect(style.borderColor).toBe(brandBorder);
  });
});
