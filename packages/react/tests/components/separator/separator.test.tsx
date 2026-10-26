import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Separator } from '~/components/separator/separator';

describe('Separator', () => {
  it('is not exposed to the accessibility tree when decorative', async () => {
    await render(<Separator decorative />);

    await expect.element(page.getByRole('separator')).not.toBeInTheDocument();
  });

  it('has the separator role when not decorative', async () => {
    await render(<Separator decorative={false} />);

    await expect.element(page.getByRole('separator')).toBeInTheDocument();
  });

  it('exposes aria-orientation when not decorative', async () => {
    await render(
      <Separator
        decorative={false}
        orientation="vertical"
      />,
    );

    await expect
      .element(page.getByRole('separator'))
      .toHaveAttribute('aria-orientation', 'vertical');
  });

  it('reports horizontal orientation', async () => {
    await render(
      <Separator
        decorative={false}
        orientation="horizontal"
      />,
    );

    // horizontal is the implicit default: it is either explicit or omitted
    const separator = page.getByRole('separator');
    await expect.element(separator).toBeInTheDocument();
    expect(separator.element().getAttribute('aria-orientation')).not.toBe('vertical');
  });
});
