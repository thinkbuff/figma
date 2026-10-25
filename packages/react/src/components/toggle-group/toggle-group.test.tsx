import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';

import { firstArg, getToggleable, isOn } from '~/test-utils';

import { ToggleGroup, ToggleGroupItem } from './toggle-group';

function Fixture(props: React.ComponentProps<typeof ToggleGroup>) {
  return (
    <ToggleGroup {...props}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}

describe('ToggleGroup', () => {
  it('selects a single item at a time in single mode', async () => {
    await render(<Fixture type="single" />);

    await userEvent.click(getToggleable('Left'));
    expect(isOn(getToggleable('Left').element())).toBe(true);
    expect(isOn(getToggleable('Center').element())).toBe(false);

    await userEvent.click(getToggleable('Center'));
    expect(isOn(getToggleable('Center').element())).toBe(true);
    expect(isOn(getToggleable('Left').element())).toBe(false);
  });

  it('selects multiple items in multiple mode', async () => {
    await render(<Fixture type="multiple" />);

    await userEvent.click(getToggleable('Left'));
    await userEvent.click(getToggleable('Right'));

    expect(isOn(getToggleable('Left').element())).toBe(true);
    expect(isOn(getToggleable('Right').element())).toBe(true);
    expect(isOn(getToggleable('Center').element())).toBe(false);
  });

  it('respects defaultValue', async () => {
    await render(
      <Fixture
        defaultValue="center"
        type="single"
      />,
    );

    expect(isOn(getToggleable('Center').element())).toBe(true);
  });

  it('calls onValueChange with the new selection', async () => {
    const onValueChange = vi.fn<() => void>();
    await render(
      <Fixture
        onValueChange={onValueChange}
        type="single"
      />,
    );

    await userEvent.click(getToggleable('Right'));

    expect(onValueChange).toHaveBeenCalledOnce();
    expect(firstArg(onValueChange)).toBe('right');
  });

  it('does not toggle a disabled item', async () => {
    await render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem
          disabled
          value="center"
        >
          Center
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const center = getToggleable('Center');
    await expect.element(center).toBeDisabled();
    expect(isOn(center.element())).toBe(false);
  });
});
