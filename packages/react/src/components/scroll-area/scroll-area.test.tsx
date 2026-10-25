import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { ScrollArea } from './scroll-area';

describe('ScrollArea', () => {
  it('renders children', async () => {
    await render(
      <ScrollArea>
        <div>First item</div>
      </ScrollArea>,
    );

    await expect.element(page.getByText('First item')).toBeVisible();
  });

  it('overflowing content is scrollable', async () => {
    await render(
      <ScrollArea style={{ height: 80, width: 120 }}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>{`Item ${i + 1}`}</div>
        ))}
      </ScrollArea>,
    );

    const last = page.getByText('Item 50');
    await expect.element(last).toBeInTheDocument();

    // find the scrollable ancestor of the content
    let scroller = (last.element() as HTMLElement).parentElement;
    while (scroller && scroller.scrollHeight <= scroller.clientHeight) {
      scroller = scroller.parentElement;
    }

    expect(scroller).not.toBeNull();
    expect(scroller!.scrollHeight).toBeGreaterThan(scroller!.clientHeight);

    scroller!.scrollTop = 100;
    expect(scroller!.scrollTop).toBeGreaterThan(0);
  });
});
