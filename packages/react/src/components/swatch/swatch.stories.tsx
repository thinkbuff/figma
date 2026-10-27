import type { Meta, StoryObj } from '@storybook/react-vite';

import * as ValueField from '../value-field/value-field';
import { Swatch } from './swatch';

const meta = {
  title: 'Components/Swatch',
  component: Swatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    fill: '#ff24bd',
    size: 'default',
  },
} satisfies Meta<React.ComponentPropsWithRef<typeof Swatch>>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fills: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Swatch fill="#ff24bd" />
      <Swatch fill="rgba(255, 36, 189, 0.4)" />
      <Swatch fill="linear-gradient(90deg, #ff24bd, #007be5)" />
      <Swatch fill="conic-gradient(#f24822, #ffcd29, #14ae5c, #007be5, #9747ff, #f24822)" />
      <Swatch fill="repeating-linear-gradient(45deg, #1e1e1e 0 4px, #ffcd29 4px 8px)" />
    </div>
  ),
};

export const InValueField: Story = {
  render: () => (
    <ValueField.Root>
      <ValueField.Label>
        <Swatch fill="rgba(255, 36, 189, 0.24)" />
      </ValueField.Label>
      <ValueField.Hex
        value={{ r: 1, g: 0.14, b: 0.74, a: 0.24 }}
        onChange={() => {}}
      />
    </ValueField.Root>
  ),
};

export default meta;
