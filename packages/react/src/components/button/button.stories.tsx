import type { Meta, StoryObj } from '@storybook/react-vite';

import { PlusIcon } from '~/icons';

import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { children: 'Primary' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Destructive' } };
export const SecondaryDestructive: Story = {
  args: { variant: 'secondary-destructive', children: 'Secondary destructive' },
};
export const Inverse: Story = { args: { variant: 'inverse', children: 'Inverse' } };
export const Success: Story = { args: { variant: 'success', children: 'Success' } };
export const FigJam: Story = { args: { variant: 'figjam', children: 'Open in FigJam' } };
export const Link: Story = { args: { variant: 'link', children: 'Link' } };
export const LinkDanger: Story = { args: { variant: 'link-danger', children: 'Link danger' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost' } };
export const Large: Story = { args: { size: 'large', children: 'Large' } };
export const Wide: Story = { args: { size: 'wide', children: 'Wide' } };
export const WithIcon: Story = {
  args: { icon: <PlusIcon />, children: 'With icon' },
};
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(
        [
          'primary',
          'secondary',
          'destructive',
          'secondary-destructive',
          'inverse',
          'success',
          'figjam',
          'link',
          'link-danger',
          'ghost',
        ] as const
      ).map((variant) => (
        <Button
          key={variant}
          variant={variant}
          disabled
        >
          {variant}
        </Button>
      ))}
    </div>
  ),
};
