import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  AlignHorizontalCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  MinusIcon,
  TextAlignJustifiedIcon,
} from '~/icons';

import { SegmentedControl, SegmentedControlItem, SegmentedControlText } from './segmented-control';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    defaultValue: 'left',
  },
} satisfies Meta<React.ComponentPropsWithRef<typeof SegmentedControl>>;

type Story = StoryObj<typeof meta>;

const alignOptions = [
  { value: 'left', label: 'Align left', icon: <AlignLeftIcon size="4" /> },
  { value: 'center', label: 'Align center', icon: <AlignHorizontalCenterIcon size="4" /> },
  { value: 'right', label: 'Align right', icon: <AlignRightIcon size="4" /> },
  { value: 'justify', label: 'Align justify', icon: <TextAlignJustifiedIcon size="4" /> },
];

export const Icons: Story = {
  render: (args) => (
    <SegmentedControl {...args}>
      {alignOptions.map((option) => (
        <SegmentedControlItem
          key={option.value}
          value={option.value}
          aria-label={option.label}
        >
          {option.icon}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  ),
};

export const DefaultMark: Story = {
  render: (args) => (
    <SegmentedControl
      {...args}
      defaultValue="auto"
    >
      <SegmentedControlItem
        value="auto"
        aria-label="Default"
      >
        <MinusIcon size="4" />
      </SegmentedControlItem>
      {['17', '17', '17', '17'].map((label, i) => (
        <SegmentedControlItem
          key={i}
          value={`v${i}`}
        >
          <SegmentedControlText>{label}</SegmentedControlText>
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  ),
};

export const Labels: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-2">
      <SegmentedControl
        {...args}
        defaultValue="minimalist"
      >
        {['Minimalist', 'Modern', 'Retro'].map((label) => (
          <SegmentedControlItem
            key={label}
            value={label.toLowerCase()}
          >
            <SegmentedControlText>{label}</SegmentedControlText>
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <div style={{ width: 168 }}>
        <SegmentedControl
          fullWidth
          defaultValue="a"
        >
          <SegmentedControlItem value="a">
            <SegmentedControlText>Truncation label</SegmentedControlText>
          </SegmentedControlItem>
          <SegmentedControlItem value="b">
            <SegmentedControlText>Label</SegmentedControlText>
          </SegmentedControlItem>
          <SegmentedControlItem value="c">
            <SegmentedControlText>Label</SegmentedControlText>
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: Icons.render,
};

export default meta;
