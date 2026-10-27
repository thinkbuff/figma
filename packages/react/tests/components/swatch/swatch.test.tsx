import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { Swatch } from '~/components/swatch/swatch';

describe('Swatch', () => {
  it('paints the fill over a checkerboard', async () => {
    const { container } = await render(<Swatch fill="#ff24bd" />);
    const layers = container.querySelectorAll('span > span');
    expect(layers).toHaveLength(2);
    expect((layers[0] as HTMLElement).style.background).toContain('repeating-conic-gradient');
    expect((layers[1] as HTMLElement).style.background).toContain('rgb(255, 36, 189)');
  });

  it('applies the small size', async () => {
    const { container } = await render(
      <Swatch
        size="small"
        fill="red"
      />,
    );
    expect((container.firstElementChild as HTMLElement).className).toContain('size-3');
  });
});
