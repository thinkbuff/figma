/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip, TooltipProvider } from '../tooltip';
import * as SegmentedControl from './segmented-control';

type StoryArgs = React.ComponentPropsWithRef<typeof SegmentedControl.Root>;

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    disabled: false,
    fullWidth: false,
    defaultValue: 'left',
  },
  render: function Render(args) {
    return <AlignmentControl {...args} />;
  },
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

const alignOptions = [
  { value: 'left', label: 'Align left', icon: 'icon-[tabler--align-left]' },
  { value: 'center', label: 'Align center', icon: 'icon-[tabler--align-center]' },
  { value: 'right', label: 'Align right', icon: 'icon-[tabler--align-right]' },
  { value: 'justify', label: 'Align justify', icon: 'icon-[tabler--align-justified]' },
];

function AlignmentControl(props: Pick<StoryArgs, 'disabled' | 'fullWidth' | 'defaultValue'>) {
  return (
    <SegmentedControl.Root {...props}>
      {alignOptions.map((option) => (
        <SegmentedControl.Item
          key={option.value}
          value={option.value}
          aria-label={option.label}
        >
          <span className={`${option.icon} size-4`}></span>
        </SegmentedControl.Item>
      ))}
    </SegmentedControl.Root>
  );
}

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithTooltips: Story = {
  render: function Render(args) {
    return (
      <TooltipProvider delay={200}>
        <SegmentedControl.Root {...args}>
          {alignOptions.map((option) => (
            <Tooltip
              key={option.value}
              content={option.label}
            >
              <div className="inline-flex items-center justify-center">
                <SegmentedControl.Item
                  value={option.value}
                  aria-label={option.label}
                >
                  <span className={`${option.icon} size-4`}></span>
                </SegmentedControl.Item>
              </div>
            </Tooltip>
          ))}
        </SegmentedControl.Root>
      </TooltipProvider>
    );
  },
};

export const Text: Story = {
  render: function Render() {
    return (
      <SegmentedControl.Root defaultValue="minimalist">
        <SegmentedControl.Item value="minimalist">
          <SegmentedControl.Text>Minimalist</SegmentedControl.Text>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="modern">
          <SegmentedControl.Text>Modern</SegmentedControl.Text>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="retro">
          <SegmentedControl.Text>Retro</SegmentedControl.Text>
        </SegmentedControl.Item>
      </SegmentedControl.Root>
    );
  },
};

export default meta;
