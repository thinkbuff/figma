import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';

import { firstArg, pressKey } from '~/test-utils';

import { Radio } from './index';

function Fixture(props: React.ComponentProps<typeof Radio.Group>) {
  return (
    <Radio.Group {...props}>
      <Radio.GroupItem aria-label="Option A" value="a" />
      <Radio.GroupItem aria-label="Option B" value="b" />
      <Radio.GroupItem aria-label="Option C" value="c" />
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

    await expect.element(page.getByRole('radio', { name: 'Option B' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await expect.element(page.getByRole('radio', { name: 'Option A' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('moves selection with arrow keys', async () => {
    await render(<Fixture defaultValue="a" />);

    (page.getByRole('radio', { name: 'Option A' }).element() as HTMLElement).focus();
    pressKey('ArrowDown');

    await expect.element(page.getByRole('radio', { name: 'Option B' })).toHaveAttribute(
      'aria-checked',
      'true',
    );

    pressKey('ArrowDown');
    await expect.element(page.getByRole('radio', { name: 'Option C' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('skips disabled items during keyboard navigation', async () => {
    await render(
      <Radio.Group defaultValue="a">
        <Radio.GroupItem aria-label="Option A" value="a" />
        <Radio.GroupItem aria-label="Option B" disabled value="b" />
        <Radio.GroupItem aria-label="Option C" value="c" />
      </Radio.Group>,
    );

    (page.getByRole('radio', { name: 'Option A' }).element() as HTMLElement).focus();
    pressKey('ArrowDown');

    await expect.element(page.getByRole('radio', { name: 'Option C' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await expect.element(page.getByRole('radio', { name: 'Option B' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('respects defaultValue', async () => {
    await render(<Fixture defaultValue="b" />);

    await expect.element(page.getByRole('radio', { name: 'Option B' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('calls onValueChange with the selected value', async () => {
    const onValueChange = vi.fn();
    await render(<Fixture onValueChange={onValueChange} />);

    await userEvent.click(page.getByRole('radio', { name: 'Option C' }));

    expect(onValueChange).toHaveBeenCalledOnce();
    expect(firstArg(onValueChange)).toBe('c');
  });
});
