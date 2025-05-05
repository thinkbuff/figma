import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Tooltip, TooltipProvider } from '../tooltip';

import { ToggleGroup, ToggleGroupItem } from './toggle-group';

type StoryArgs = React.ComponentPropsWithRef<typeof ToggleGroup>;

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
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
    type: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    disabled: false,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs<{
      value: string;
    }>();
    const options = [
      {
        value: 'horizontal',
        label: 'Horizontal layout',
        icon: <span className="i-tabler-arrow-left"></span>,
      },
      {
        value: 'vertical',
        label: 'Vertical layout',
        icon: <span className="i-tabler-arrow-down"></span>,
      },
      {
        value: 'wrap',
        label: 'Wrap ',
        icon: <span className="i-tabler-arrow-back"></span>,
      },
    ];
    return (
      <ToggleGroup
        {...args}
        type="single"
        defaultValue="horizontal"
        value={value}
        onValueChange={(selected) => {
          if (selected) {
            updateArgs({ value: selected });
          }
        }}
      >
        {options.map(option => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  },
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    type: 'single',
    value: 'horizontal',
  },
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    value: [],
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs<{
      value: string[];
    }>();
    const options = [
      {
        value: 'bold',
        label: 'Bold',
        icon: <span className="i-tabler-bold"></span>,
      },
      {
        value: 'italic',
        label: 'Italic',
        icon: <span className="i-tabler-italic"></span>,
      },
      {
        value: 'underline',
        label: 'Underline ',
        icon: <span className="i-tabler-underline"></span>,
      },
    ];
    return (
      <ToggleGroup
        {...args}
        type="multiple"
        defaultValue={[]}
        value={value}
        onValueChange={(selected) => {
          updateArgs({ value: selected });
        }}
      >
        {options.map(option => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  },
};

export const WithTooltip: Story = {
  args: {
    type: 'multiple',
    value: [],
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs<{
      value: string[];
    }>();
    const options = [
      {
        value: 'bold',
        label: 'Bold',
        icon: <span className="i-tabler-bold"></span>,
      },
      {
        value: 'italic',
        label: 'Italic',
        icon: <span className="i-tabler-italic"></span>,
      },
      {
        value: 'underline',
        label: 'Underline ',
        icon: <span className="i-tabler-underline"></span>,
      },
    ];
    return (
      <TooltipProvider delayDuration={200}>
        <ToggleGroup
          {...args}
          type="multiple"
          defaultValue={[]}
          value={value}
          onValueChange={(selected) => {
            updateArgs({ value: selected });
          }}
        >
          {options.map(option => (
            <Tooltip key={option.value} content={option.label}>
              <div className="inline-flex items-center justify-center">
                <ToggleGroupItem value={option.value}>
                  {option.icon}
                </ToggleGroupItem>
              </div>
            </Tooltip>
          ))}
        </ToggleGroup>
      </TooltipProvider>
    );
  },
};

export const Disabled: Story = {
  args: {
    type: 'single',
    value: 'vertical',
    disabled: true,
  },
};

export default meta;
