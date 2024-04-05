import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Label } from '../label';

import * as Radio from './radio';

const meta = {
  title: 'Components/Radio',
  component: Radio.Group,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
    value: {
      control: 'inline-radio',
      options: ['all', 'only', 'none'],
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
  },
  args: {
    disabled: false,
    value: 'all',
    orientation: 'vertical',
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const options = [{
      value: 'all',
      label: 'All comments, mentions, and replies',
    }, {
      value: 'only',
      label: 'Only mentions and replies',
    }, {
      value: 'none',
      label: 'None',
    }];

    return (
      <Radio.Group
        {...args}
        className="gap-3"
        value={value}
        onValueChange={changed => updateArgs({ value: changed })}
      >
        {options.map(option => (
          <div key={option.value} className="flex items-center gap-2">
            <Radio.GroupItem
              id={`radio-${option.value}`}
              value={option.value}
            />
            <Label htmlFor={`radio-${option.value}`}>
              {option.label}
            </Label>
          </div>
        ))}
      </Radio.Group>
    );
  },
} satisfies Meta<typeof Radio.Group>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export default meta;
