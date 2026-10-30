import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { ActionIconSplit } from '~/components/action-icon-split/index';

function Split({
  onPrimary,
  onChevron,
  ...props
}: React.ComponentProps<typeof ActionIconSplit.Root> & {
  onPrimary?: () => void;
  onChevron?: () => void;
}) {
  return (
    <ActionIconSplit.Root {...props}>
      <ActionIconSplit.Button
        aria-label="Run"
        onClick={onPrimary}
      />
      <ActionIconSplit.Chevron
        aria-label="More options"
        onClick={onChevron}
      />
    </ActionIconSplit.Root>
  );
}

describe('ActionIconSplit', () => {
  it('renders two labelled buttons', async () => {
    await render(<Split />);

    await expect.element(page.getByRole('button', { name: 'Run' })).toBeVisible();
    await expect.element(page.getByRole('button', { name: 'More options' })).toBeVisible();
  });

  it('fires each half independently', async () => {
    const onPrimary = vi.fn<() => void>();
    const onChevron = vi.fn<() => void>();
    await render(
      <Split
        onPrimary={onPrimary}
        onChevron={onChevron}
      />,
    );

    await userEvent.click(page.getByRole('button', { name: 'Run' }));
    expect(onPrimary).toHaveBeenCalledOnce();
    expect(onChevron).not.toHaveBeenCalled();

    await userEvent.click(page.getByRole('button', { name: 'More options' }));
    expect(onChevron).toHaveBeenCalledOnce();
    expect(onPrimary).toHaveBeenCalledOnce();
  });

  it('disables both halves', async () => {
    const onPrimary = vi.fn<() => void>();
    await render(
      <Split
        disabled
        onPrimary={onPrimary}
      />,
    );

    await expect.element(page.getByRole('button', { name: 'Run' })).toBeDisabled();
    await expect.element(page.getByRole('button', { name: 'More options' })).toBeDisabled();
  });
});
