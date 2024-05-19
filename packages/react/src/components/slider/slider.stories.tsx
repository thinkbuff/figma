import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { TooltipProvider, Tooltip } from '../tooltip';

import {
  Slider,
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from './slider';

type CustomStoryProps = React.ComponentPropsWithoutRef<typeof Slider> & {
  showTooltip?: boolean;
};

const meta = {
  title: 'Components/Slider',
  component: Slider,
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
    value: {
      control: 'array',
      table: {
        defaultValue: { summary: '[0]' },
        type: {
          summary: 'number[]',
          detail:
            'The controlled value of the slider. Must be used in conjunction with onValueChange.',
        },
      },
    },
    inverted: {
      table: {
        type: {
          summary: 'boolean',
          detail: 'Whether the slider is visually inverted.',
        },
      },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
        type: {
          summary: 'enum',
          detail: 'The orientation of the slider.',
        },
      },
    },
    min: {
      table: {
        type: {
          summary: 'number',
          detail: 'The minimum value for the range.',
        },
      },
    },
    max: {
      table: {
        type: {
          summary: 'number',
          detail: 'The maximum value for the range.',
        },
      },
    },
    step: {
      table: {
        type: {
          summary: 'number',
          detail: 'The stepping interval.',
        },
      },
    },
    minStepsBetweenThumbs: {
      table: {
        type: {
          summary: 'number',
          detail: 'The minimum permitted steps between multiple thumbs.',
        },
      },
    },
    showTooltip: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    disabled: false,
    inverted: false,
    orientation: 'horizontal',
    value: [50],
    min: 0,
    max: 100,
    step: 1,
    minStepsBetweenThumbs: 0,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();
    return (
      <div className="min-h-60 min-w-60 flex items-center justify-center">
        <Slider
          {...args}
          value={value}
          className="data-[orientation=vertical]:h-60"
          onValueChange={changed => updateArgs({ value: changed })}
        />
      </div>
    );
  },
} satisfies Meta<CustomStoryProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const RangeSlider: Story = {
  args: {
    value: [20, 30],
  },
};

export const CustomStyle: Story = {
  render: (args) => {
    const [{ value: values }, updateArgs] = useArgs<{
      value: number[];
    }>();
    return (
      <div className="min-h-60 min-w-60 flex items-center justify-center">
        <SliderRoot
          {...args}
          value={values}
          className="data-[orientation=vertical]:h-60"
          onValueChange={value => updateArgs({ value })}
        >
          <SliderTrack className="h-1px bg-figma-icon data-[orientation=vertical]:w-1px">
            <SliderRange className="bg-figma-icon" />
          </SliderTrack>
          {values.map((_, index) => (
            <SliderThumb key={index} />
          ))}
        </SliderRoot>
      </div>
    );
  },
};

export const WithValueTooltip: Story = {
  argTypes: {
    showTooltip: {
      control: 'boolean',
      table: {
        disable: false,
      },
    },
  },
  args: {
    showTooltip: false,
  },
  render: ({ showTooltip: _, ...props }) => {
    const [{ value: values, showTooltip }, updateArgs] = useArgs<{
      value: number[];
      showTooltip: boolean;
    }>();

    return (
      <TooltipProvider>
        <div className="relative min-h-60 min-w-60 flex items-center justify-center">
          <SliderRoot
            {...props}
            value={values}
            className="data-[orientation=vertical]:h-60"
            onValueChange={value => updateArgs({ value })}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            {values.map((value, index) => (
              <Tooltip
                key={index}
                defaultOpen={showTooltip}
                open={showTooltip}
                side={props.orientation === 'horizontal' ? 'top' : 'left'}
                content={<p>{value}</p>}
                delayDuration={200}
                updatePositionStrategy="always"
              >
                <SliderThumb
                  onMouseOver={() => updateArgs({ showTooltip: true })}
                  onMouseOut={() => updateArgs({ showTooltip: false })}
                />
              </Tooltip>
            ))}
          </SliderRoot>
        </div>
      </TooltipProvider>
    );
  },
};

export default meta;
