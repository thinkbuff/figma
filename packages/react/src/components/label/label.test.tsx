import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';

import { Label } from './label';

describe('Label', () => {
  it('renders label text', async () => {
    await render(<Label htmlFor="name">Name</Label>);

    await expect.element(page.getByText('Name')).toBeVisible();
  });

  it('focuses the associated control on click', async () => {
    await render(
      <>
        <Label htmlFor="name">Name</Label>
        <input id="name" type="text" />
      </>,
    );

    await userEvent.click(page.getByText('Name'));

    await expect.element(page.getByRole('textbox')).toHaveFocus();
  });
});
