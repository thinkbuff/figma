import type { Meta, StoryObj } from '@storybook/react-vite';

import { FolderIcon, FrameIcon, LinkIcon, MailIcon, PlayIcon } from '~/icons';

import { LinkTooltip, LinkTooltipAction, LinkTooltipInput, LinkTooltipItem } from './link-tooltip';

const meta = {
  title: 'Components/LinkTooltip',
  component: LinkTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<React.ComponentPropsWithRef<typeof LinkTooltip>>;

type Story = StoryObj<typeof meta>;

export const UrlInput: Story = {
  render: () => (
    <LinkTooltip arrow>
      <LinkTooltipInput placeholder="Type or paste URL" />
    </LinkTooltip>
  ),
};

export const LinkActions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <LinkTooltip arrow>
        <LinkTooltipItem icon={<LinkIcon size="4" />}>
          <LinkTooltipAction>Open google.com</LinkTooltipAction>
          <LinkTooltipAction>Edit</LinkTooltipAction>
        </LinkTooltipItem>
      </LinkTooltip>
      <LinkTooltip arrow>
        <LinkTooltipItem icon={<MailIcon size="4" />}>
          <LinkTooltipAction>Copy mail@mail.com</LinkTooltipAction>
          <LinkTooltipAction>Send mail</LinkTooltipAction>
          <LinkTooltipAction>Edit</LinkTooltipAction>
        </LinkTooltipItem>
      </LinkTooltip>
      <LinkTooltip arrow>
        <LinkTooltipItem icon={<PlayIcon size="4" />}>
          <LinkTooltipAction>Open prototype</LinkTooltipAction>
          <LinkTooltipAction>Edit</LinkTooltipAction>
        </LinkTooltipItem>
      </LinkTooltip>
      <LinkTooltip arrow>
        <LinkTooltipItem icon={<FrameIcon size="4" />}>
          <LinkTooltipAction>Go to frame</LinkTooltipAction>
          <LinkTooltipAction>Edit</LinkTooltipAction>
        </LinkTooltipItem>
      </LinkTooltip>
      <LinkTooltip arrow>
        <LinkTooltipItem icon={<FolderIcon size="4" />}>
          <LinkTooltipAction>Open file</LinkTooltipAction>
          <LinkTooltipAction>Edit</LinkTooltipAction>
        </LinkTooltipItem>
      </LinkTooltip>
    </div>
  ),
};

export default meta;
