import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

describe('UI3 theme tokens', () => {
  it('resolves shadow-figma-elevation-* against the nearest theme scope', async () => {
    const { container } = await render(
      <div className="figma-light">
        <div
          data-testid="light"
          className="shadow-figma-elevation-300"
        />
        <div className="figma-dark">
          <div
            data-testid="dark"
            className="shadow-figma-elevation-300"
          />
        </div>
      </div>,
    );

    const light = container.querySelector<HTMLElement>('[data-testid="light"]')!;
    const dark = container.querySelector<HTMLElement>('[data-testid="dark"]')!;
    const lightShadow = getComputedStyle(light).boxShadow;
    const darkShadow = getComputedStyle(dark).boxShadow;

    expect(lightShadow).not.toBe('none');
    expect(darkShadow).not.toBe('none');
    expect(darkShadow).not.toBe(lightShadow);
    expect(darkShadow).toContain('inset');
  });

  it('applies size, leading, tracking, and weight via text-figma-heading-medium', async () => {
    const { container } = await render(
      <div
        data-testid="heading"
        className="text-figma-heading-medium"
      />,
    );

    const style = getComputedStyle(
      container.querySelector<HTMLElement>('[data-testid="heading"]')!,
    );

    expect(style.fontSize).toBe('15px');
    expect(style.lineHeight).toBe('25px');
    expect(style.fontWeight).toBe('550');
    expect(style.letterSpacing).not.toBe('normal');
  });
});
