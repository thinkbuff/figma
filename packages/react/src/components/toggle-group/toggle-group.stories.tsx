import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import {
  AlignHorizontalCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  TextAlignJustifiedIcon,
} from '~/icons';

import { Tooltip, TooltipProvider } from '../tooltip';
import { ToggleGroup, ToggleGroupItem, ToggleGroupText } from './toggle-group';

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
  },
  args: {
    disabled: false,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<{
      value: string[];
    }>();
    const options = [
      {
        value: 'horizontal',
        label: 'Horizontal layout',
        icon: <span className="icon-[tabler--arrow-left]"></span>,
      },
      {
        value: 'vertical',
        label: 'Vertical layout',
        icon: <span className="icon-[tabler--arrow-down]"></span>,
      },
      {
        value: 'wrap',
        label: 'Wrap',
        icon: <span className="icon-[tabler--arrow-back]"></span>,
      },
    ];
    return (
      <ToggleGroup
        {...args}
        defaultValue={['horizontal']}
        value={value}
        onValueChange={(selected) => {
          updateArgs({ value: selected });
        }}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
          >
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
    value: ['horizontal'],
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    value: [],
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<{
      value: string[];
    }>();
    const options = [
      {
        value: 'bold',
        label: 'Bold',
        icon: <span className="icon-[tabler--bold]"></span>,
      },
      {
        value: 'italic',
        label: 'Italic',
        icon: <span className="icon-[tabler--italic]"></span>,
      },
      {
        value: 'underline',
        label: 'Underline',
        icon: <span className="icon-[tabler--underline]"></span>,
      },
    ];
    return (
      <ToggleGroup
        {...args}
        multiple
        defaultValue={[]}
        value={value}
        onValueChange={(selected) => {
          updateArgs({ value: selected });
        }}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
          >
            {option.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  },
};

export const WithTooltip: Story = {
  args: {
    multiple: true,
    value: [],
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<{
      value: string[];
    }>();
    const options = [
      {
        value: 'bold',
        label: 'Bold',
        icon: <span className="icon-[tabler--bold]"></span>,
      },
      {
        value: 'italic',
        label: 'Italic',
        icon: <span className="icon-[tabler--italic]"></span>,
      },
      {
        value: 'underline',
        label: 'Underline',
        icon: <span className="icon-[tabler--underline]"></span>,
      },
    ];
    return (
      <TooltipProvider delay={200}>
        <ToggleGroup
          {...args}
          multiple
          defaultValue={[]}
          value={value}
          onValueChange={(selected) => {
            updateArgs({ value: selected });
          }}
        >
          {options.map((option) => (
            <Tooltip
              key={option.value}
              content={option.label}
            >
              <div className="inline-flex items-center justify-center">
                <ToggleGroupItem value={option.value}>{option.icon}</ToggleGroupItem>
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
    value: ['vertical'],
    disabled: true,
  },
};

const alignOptions = [
  { value: 'left', label: 'Align left', icon: <AlignLeftIcon size="4" /> },
  { value: 'center', label: 'Align center', icon: <AlignHorizontalCenterIcon size="4" /> },
  { value: 'right', label: 'Align right', icon: <AlignRightIcon size="4" /> },
  { value: 'justify', label: 'Align justify', icon: <TextAlignJustifiedIcon size="4" /> },
];

export const FullWidth: Story = {
  render: function Render() {
    return (
      <ToggleGroup
        fullWidth
        defaultValue={['left']}
      >
        {alignOptions.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            aria-label={option.label}
          >
            {option.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export const Text: Story = {
  render: function Render() {
    return (
      <ToggleGroup defaultValue={['minimalist']}>
        <ToggleGroupItem value="minimalist">
          <ToggleGroupText>Minimalist</ToggleGroupText>
        </ToggleGroupItem>
        <ToggleGroupItem value="modern">
          <ToggleGroupText>Modern</ToggleGroupText>
        </ToggleGroupItem>
        <ToggleGroupItem value="retro">
          <ToggleGroupText>Retro</ToggleGroupText>
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export default meta;
