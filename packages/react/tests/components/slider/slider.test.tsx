import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import {
  Slider,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '~/components/slider/slider';

import { clickAt, firstArg } from '../../test-utils';

describe('Slider', () => {
  it('renders a slider with the current value', async () => {
    await render(
      <Slider
        defaultValue={[40]}
        max={100}
        min={0}
      />,
    );

    const slider = page.getByRole('slider');
    await expect.element(slider).toBeVisible();
    await expect.element(slider).toHaveAttribute('aria-valuenow', '40');
    // Base UI: role=slider lives on a hidden <input type="range">, which carries native min/max attrs instead of aria-valuemin/max.
    await expect.element(slider).toHaveAttribute('min', '0');
    await expect.element(slider).toHaveAttribute('max', '100');
  });

  it('steps with ArrowRight and ArrowLeft', async () => {
    await render(
      <Slider
        defaultValue={[40]}
        max={100}
        min={0}
        step={10}
      />,
    );

    const slider = page.getByRole('slider');
    (slider.element() as HTMLElement).focus();

    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '50');

    await userEvent.keyboard('{ArrowLeft}');
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '30');
  });

  it('jumps to min/max with Home and End', async () => {
    await render(
      <Slider
        defaultValue={[40]}
        max={100}
        min={0}
        step={10}
      />,
    );

    const slider = page.getByRole('slider');
    (slider.element() as HTMLElement).focus();

    await userEvent.keyboard('{End}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '100');

    await userEvent.keyboard('{Home}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '0');
  });

  it('is disabled', async () => {
    const onValueChange = vi.fn<() => void>();
    await render(
      <Slider
        defaultValue={[40]}
        disabled
        onValueChange={onValueChange}
      />,
    );

    const slider = page.getByRole('slider');
    const sliderEl = slider.element() as HTMLElement;

    // Base UI: disabled state is exposed via data-disabled (the hidden input also carries the disabled attr).
    const disabledAncestor = sliderEl.closest('[data-disabled]') as HTMLElement | null;
    expect(disabledAncestor?.getAttribute('data-disabled')).not.toBeNull();

    // pointer interaction does not change the value
    const root = page.elementLocator(sliderEl.parentElement as Element);
    await clickAt(root, (root.element() as HTMLElement).clientWidth - 2, 4);

    await expect.element(slider).toHaveAttribute('aria-valuenow', '40');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders hint ticks and emphasizes the base value', async () => {
    const { container } = await render(
      <Slider
        defaultValue={[50]}
        hints={[0, 25, 50, 75, 100]}
        baseValue={50}
      />,
    );

    const hints = container.querySelectorAll('[data-hint]');
    expect(hints).toHaveLength(5);
    const emphasized = container.querySelectorAll('[data-hint].bg-black\\/85');
    expect(emphasized).toHaveLength(1);
  });

  it('does not snap keyboard steps, so hints are escapable', async () => {
    await render(
      <Slider
        defaultValue={[50]}
        hints={[50]}
        step={1}
      />,
    );

    const slider = page.getByRole('slider');
    (slider.element() as HTMLElement).focus();

    // 50 -> 49 must stay there even though 49 is inside the snap threshold.
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '49');
  });

  it('snaps pointer input to the nearest hint within the threshold', async () => {
    const { container } = await render(
      <Slider
        defaultValue={[0]}
        hints={[50]}
        step={1}
      />,
    );

    const slider = page.getByRole('slider');
    const root = page.elementLocator(container.firstElementChild as Element);
    const rect = (root.element() as HTMLElement).getBoundingClientRect();
    // click at ~49% of the track: inside the 2% snap window around 50
    await clickAt(root, rect.width * 0.49, rect.height / 2);
    await expect.element(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('exposes aria-orientation for vertical sliders', async () => {
    await render(
      <Slider
        defaultValue={[40]}
        orientation="vertical"
      />,
    );

    await expect.element(page.getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('calls onValueChange with the new value', async () => {
    const onValueChange = vi.fn<() => void>();
    await render(
      <Slider
        defaultValue={[40]}
        max={100}
        min={0}
        step={10}
        onValueChange={onValueChange}
      />,
    );

    const slider = page.getByRole('slider');
    (slider.element() as HTMLElement).focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(onValueChange).toHaveBeenCalled();
    // callback arity/shape varies between primitives (Radix passes an array)
    expect([firstArg(onValueChange)].flat()[0]).toBe(50);
  });
});

describe('range coverage', () => {
  it('extends the indicator under the center of every thumb', async () => {
    await render(
      <SliderRoot
        defaultValue={[25, 75]}
        data-testid="slider"
      >
        <SliderTrack>
          <SliderRange data-testid="range" />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
      </SliderRoot>,
    );

    const range = document
      .querySelector<HTMLElement>('[data-testid="range"]')!
      .getBoundingClientRect();
    const thumbs = [...document.querySelectorAll<HTMLElement>('[role="slider"], [data-index]')]
      .filter((el) => el.hasAttribute('data-index'))
      .map((el) => el.getBoundingClientRect());

    const firstCenter = thumbs[0].left + thumbs[0].width / 2;
    const lastCenter = thumbs[thumbs.length - 1].left + thumbs[thumbs.length - 1].width / 2;

    expect(range.left).toBeLessThanOrEqual(firstCenter);
    expect(range.right).toBeGreaterThanOrEqual(lastCenter);
  });
});
