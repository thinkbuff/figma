import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';

import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders a textbox', async () => {
    await render(<Textarea aria-label="Bio" />);

    await expect.element(page.getByRole('textbox', { name: 'Bio' })).toBeVisible();
  });

  it('updates value and calls onChange when typing', async () => {
    const onChange = vi.fn();
    await render(<Textarea aria-label="Bio" onChange={onChange} />);

    const textarea = page.getByRole('textbox', { name: 'Bio' });
    await userEvent.fill(textarea, 'a few words');

    await expect.element(textarea).toHaveValue('a few words');
    expect(onChange).toHaveBeenCalled();
  });

  it('is disabled', async () => {
    await render(<Textarea aria-label="Bio" disabled />);

    await expect.element(page.getByRole('textbox', { name: 'Bio' })).toBeDisabled();
  });

  it('is marked invalid', async () => {
    await render(<Textarea aria-label="Bio" invalid />);

    await expect.element(page.getByRole('textbox', { name: 'Bio' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('forwards ref to the textarea element', async () => {
    const ref = createRef<HTMLTextAreaElement>();
    await render(<Textarea ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
