import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Badge } from '~/components/badge/badge';

describe('Badge', () => {
  it('renders children inside a span', async () => {
    await render(<Badge>New</Badge>);
    await expect.element(page.getByText('New')).toBeVisible();
  });

  it('renders a leading icon', async () => {
    const { container } = await render(
      <Badge
        color="success"
        icon={<span data-testid="dot" />}
      >
        Merged
      </Badge>,
    );
    expect(container.querySelector('[data-testid="dot"]')).not.toBeNull();
  });

  it('applies strong and light color styles', async () => {
    const { container } = await render(
      <>
        <Badge
          variant="strong"
          color="danger"
        >
          Removed
        </Badge>
        <Badge
          variant="light"
          color="danger"
        >
          Modified
        </Badge>
      </>,
    );
    const [strong, light] = container.querySelectorAll('span');
    expect(strong.className).toContain('bg-figma-danger');
    expect(light.className).toContain('border-figma-danger');
  });
});
