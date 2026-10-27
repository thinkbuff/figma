import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';

import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlText,
} from '~/components/segmented-control/segmented-control';

import { firstArg, getToggleable, isOn } from '../../test-utils';

function Fixture(props: React.ComponentProps<typeof SegmentedControl>) {
  return (
    <SegmentedControl {...props}>
      <SegmentedControlItem value="left">
        <SegmentedControlText>Left</SegmentedControlText>
      </SegmentedControlItem>
      <SegmentedControlItem value="center">
        <SegmentedControlText>Center</SegmentedControlText>
      </SegmentedControlItem>
      <SegmentedControlItem value="right">
        <SegmentedControlText>Right</SegmentedControlText>
      </SegmentedControlItem>
    </SegmentedControl>
  );
}

describe('SegmentedControl', () => {
  it('selects a single segment at a time', async () => {
    await render(<Fixture defaultValue="left" />);

    expect(isOn(getToggleable('Left').element())).toBe(true);

    await userEvent.click(getToggleable('Center'));
    expect(isOn(getToggleable('Center').element())).toBe(true);
    expect(isOn(getToggleable('Left').element())).toBe(false);
  });

  it('does not deselect the selected segment', async () => {
    const onValueChange = vi.fn<(value: string) => void>();
    await render(
      <Fixture
        defaultValue="left"
        onValueChange={onValueChange}
      />,
    );

    await userEvent.click(getToggleable('Left'));
    expect(isOn(getToggleable('Left').element())).toBe(true);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('calls onValueChange with the selected value', async () => {
    const onValueChange = vi.fn<(value: string) => void>();
    await render(
      <Fixture
        defaultValue="left"
        onValueChange={onValueChange}
      />,
    );

    await userEvent.click(getToggleable('Right'));
    expect(firstArg<string>(onValueChange)).toBe('right');
  });

  it('supports controlled value', async () => {
    const onValueChange = vi.fn<(value: string) => void>();
    await render(
      <Fixture
        value="center"
        onValueChange={onValueChange}
      />,
    );

    expect(isOn(getToggleable('Center').element())).toBe(true);

    await userEvent.click(getToggleable('Right'));
    expect(firstArg<string>(onValueChange)).toBe('right');
    expect(isOn(getToggleable('Center').element())).toBe(true);
  });
});
