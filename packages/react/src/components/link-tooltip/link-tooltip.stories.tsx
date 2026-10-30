import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { ValueField } from '~/components/value-field';
import { FolderIcon, FrameIcon, LinkIcon, MailIcon, PageIcon, PhoneIcon, PlayIcon } from '~/icons';

import * as Popover from '../popover';
import {
  LinkTooltip,
  LinkTooltipAction,
  LinkTooltipInput,
  LinkTooltipItem,
  LinkTooltipPopup,
} from './link-tooltip';

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
        <LinkTooltipItem icon={<PhoneIcon size="4" />}>
          <LinkTooltipAction>Call (415) 355-0394</LinkTooltipAction>
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
        <LinkTooltipItem icon={<PageIcon size="4" />}>
          <LinkTooltipAction>Go to page</LinkTooltipAction>
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

const urlFormatter = {
  format: (value: string) => value,
  parse: (input: string) => ({ valid: true as const, value: input }),
};

/**
 * The link tooltip anchored to a URL field — click the field to open the
 * editor popup, as in the Figma link control.
 */
export const InField: Story = {
  render: function Render() {
    const [url, setUrl] = React.useState('https://google.com');
    return (
      <div className="pt-40">
        <Popover.Root defaultOpen>
          <Popover.Trigger
            render={
              <ValueField.Root className="w-44">
                <ValueField.Label>
                  <LinkIcon size="4" />
                </ValueField.Label>
                <ValueField.Base
                  value={url}
                  onChange={setUrl}
                  formatter={urlFormatter}
                />
              </ValueField.Root>
            }
          />
          <LinkTooltipPopup>
            <LinkTooltipItem icon={<LinkIcon size="4" />}>
              <LinkTooltipAction>Open google.com</LinkTooltipAction>
              <LinkTooltipAction>Edit</LinkTooltipAction>
            </LinkTooltipItem>
          </LinkTooltipPopup>
        </Popover.Root>
      </div>
    );
  },
};

export default meta;
