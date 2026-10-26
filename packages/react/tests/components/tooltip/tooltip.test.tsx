import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Tooltip, TooltipProvider } from '~/components/tooltip/tooltip';

import { isRendered } from '../../test-utils';

function Fixture() {
  return (
    <TooltipProvider delay={0}>
      <Tooltip content="Helpful hint">
        <button type="button">Hover me</button>
      </Tooltip>
      <div style={{ position: 'fixed', right: 4, bottom: 4 }}>Elsewhere</div>
    </TooltipProvider>
  );
}

describe('Tooltip', () => {
  it('shows content on hover and hides on unhover', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('button', { name: 'Hover me' });
    const triggerEl = trigger.element() as HTMLElement;
    const content = page.getByText('Helpful hint');

    await trigger.hover();
    await expect.element(content).toBeInTheDocument();
    // the matched node may be a visually-hidden accessibility node;
    // its visible container must actually be rendered
    expect(isRendered(content.element().parentElement as Element)).toBe(true);
    // Base UI: the trigger carries data-popup-open while open (no aria-describedby).
    expect(triggerEl.hasAttribute('data-popup-open')).toBe(true);

    // move the pointer over unrelated content; hoverable tooltips track
    // pointermove events, so keep moving until they register the leave
    const elsewhere = page.getByText('Elsewhere');
    await elsewhere.hover();
    await expect
      .poll(async () => {
        await elsewhere.hover();
        return content.elements().length === 0;
      })
      .toBe(true);
    expect(triggerEl.hasAttribute('data-popup-open')).toBe(false);
  });

  it('shows content on focus and hides on Escape', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('button', { name: 'Hover me' });
    const content = page.getByText('Helpful hint');

    (trigger.element() as HTMLElement).focus();
    await expect.element(content).toBeInTheDocument();
    expect(isRendered(content.element().parentElement as Element)).toBe(true);

    await userEvent.keyboard('{Escape}');
    await expect.element(content).not.toBeInTheDocument();
  });
});
