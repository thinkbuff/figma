/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

import * as ContextMenu from './context-menu';

type StoryArgs = React.ComponentPropsWithRef<typeof ContextMenu.Content>;

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu.Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

function TriggerBox() {
  return (
    <div className="flex h-20 w-50 items-center justify-center rounded-md border border-figma-border text-figma-text-secondary">
      Right click here
    </div>
  );
}

export const Default: Story = {
  render: function Render() {
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger render={<TriggerBox />} />
        <ContextMenu.Content className="min-w-50">
          <ContextMenu.Item>Paste here</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Show/Hide UI</ContextMenu.Item>
          <ContextMenu.Item>Show/Hide comments</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Cursor chat</ContextMenu.Item>
          <ContextMenu.Item>Quick actions</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Plugins</ContextMenu.SubTrigger>
            <ContextMenu.SubContent className="min-w-50">
              <ContextMenu.Group>
                <ContextMenu.Label>Recents</ContextMenu.Label>
                <ContextMenu.Item>OkColor</ContextMenu.Item>
                <ContextMenu.Item>Noise & Texture</ContextMenu.Item>
                <ContextMenu.Item>Bold Blobs</ContextMenu.Item>
              </ContextMenu.Group>
              <ContextMenu.Separator />
              <ContextMenu.Item>Run last plugin</ContextMenu.Item>
              <ContextMenu.Item>Manage plugins…</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },
};

export const WithCheckboxes: Story = {
  render: function Render() {
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger render={<TriggerBox />} />
        <ContextMenu.Content className="min-w-50">
          <ContextMenu.Item>Show version history</ContextMenu.Item>
          <ContextMenu.Item>Publish library…</ContextMenu.Item>
          <ContextMenu.Item>Export…</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>File color profile…</ContextMenu.SubTrigger>
            <ContextMenu.SubContent className="min-w-40">
              <ContextMenu.CheckboxItem checked>Display P3</ContextMenu.CheckboxItem>
              <ContextMenu.CheckboxItem>Change to sRGB</ContextMenu.CheckboxItem>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
          <ContextMenu.Separator />
          <ContextMenu.Item>Duplicate</ContextMenu.Item>
          <ContextMenu.Item>Rename</ContextMenu.Item>
          <ContextMenu.Item>Move to project…</ContextMenu.Item>
          <ContextMenu.Item>Delete…</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },
};

export default meta;
