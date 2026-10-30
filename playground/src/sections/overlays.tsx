import { useState } from 'react';

import {
  EllipsisIcon,
  LinkIcon,
  MailIcon,
  PageIcon,
  PhoneIcon,
  PlayIcon,
} from '@thinkbuff/figma-react';
import { ActionIcon } from '@thinkbuff/figma-react/action-icon';
import { AlertDialog } from '@thinkbuff/figma-react/alert-dialog';
import { Button } from '@thinkbuff/figma-react/button';
import { ContextMenu } from '@thinkbuff/figma-react/context-menu';
import { Dialog } from '@thinkbuff/figma-react/dialog';
import { DropdownMenu } from '@thinkbuff/figma-react/dropdown-menu';
import { Input } from '@thinkbuff/figma-react/input';
import { Label } from '@thinkbuff/figma-react/label';
import {
  LinkTooltip,
  LinkTooltipAction,
  LinkTooltipInput,
  LinkTooltipItem,
} from '@thinkbuff/figma-react/link-tooltip';
import * as Popover from '@thinkbuff/figma-react/popover';
import { Sheet } from '@thinkbuff/figma-react/sheet';
import { Tooltip } from '@thinkbuff/figma-react/tooltip';
import { cn } from '@thinkbuff/figma-react/utils';

import { Demo } from '../demo';

function Menus() {
  const [bookmarks, setBookmarks] = useState(true);
  const [person, setPerson] = useState('pedro');

  return (
    <>
      <Demo label="Dropdown menu">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            render={
              <ActionIcon aria-label="Open menu">
                <EllipsisIcon size="4" />
              </ActionIcon>
            }
          />
          <DropdownMenu.Content className="min-w-60">
            <DropdownMenu.Item>
              New Tab <DropdownMenu.ItemShortcut>⌘+T</DropdownMenu.ItemShortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              New Window <DropdownMenu.ItemShortcut>⌘+N</DropdownMenu.ItemShortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item disabled>
              New Private Window <DropdownMenu.ItemShortcut>⇧+⌘+N</DropdownMenu.ItemShortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              File Menu <DropdownMenu.ItemBadge>Menu</DropdownMenu.ItemBadge>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              Selected <DropdownMenu.ItemCheck />
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>More Tools</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent className="min-w-40">
                <DropdownMenu.Item>
                  Save Page As <DropdownMenu.ItemShortcut>⌘+S</DropdownMenu.ItemShortcut>
                </DropdownMenu.Item>
                <DropdownMenu.Item>Create Shortcut</DropdownMenu.Item>
                <DropdownMenu.Item>Name Window</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Separator />
            <DropdownMenu.CheckboxItem
              checked={bookmarks}
              onCheckedChange={setBookmarks}
            >
              Show Bookmarks <span className="ml-auto">⌘+B</span>
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.ItemSwitch defaultChecked>Toggle row</DropdownMenu.ItemSwitch>
            <DropdownMenu.Separator />
            <DropdownMenu.RadioGroup
              value={person}
              onValueChange={setPerson}
            >
              <DropdownMenu.Label>People</DropdownMenu.Label>
              <DropdownMenu.RadioItem value="pedro">Eleven Zhang</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="colm">Jerry Zhang</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Demo>
      <Demo label="Context menu">
        <ContextMenu.Root>
          <ContextMenu.Trigger
            render={
              <div
                className={cn(
                  'flex h-20 w-56 items-center justify-center rounded-figma-md',
                  'border border-figma-border text-figma-secondary',
                )}
              >
                Right click here
              </div>
            }
          />
          <ContextMenu.Content className="min-w-50">
            <ContextMenu.Item>Paste here</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Show/Hide UI</ContextMenu.Item>
            <ContextMenu.Item>Show/Hide comments</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>Plugins</ContextMenu.SubTrigger>
              <ContextMenu.SubContent className="min-w-50">
                <ContextMenu.Group>
                  <ContextMenu.Label>Recents</ContextMenu.Label>
                  <ContextMenu.Item>OkColor</ContextMenu.Item>
                  <ContextMenu.Item>Noise & Texture</ContextMenu.Item>
                </ContextMenu.Group>
                <ContextMenu.Separator />
                <ContextMenu.Item>Run last plugin</ContextMenu.Item>
                <ContextMenu.Item>Manage plugins…</ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </Demo>
    </>
  );
}

function Dialogs() {
  return (
    <Demo label="Dialog, alert dialog, and sheet">
      <Dialog.Root>
        <Dialog.Trigger render={<Button variant="secondary">Edit profile</Button>} />
        <Dialog.Content>
          <Dialog.Header className="justify-between">
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Close
              render={
                <ActionIcon aria-label="Close">
                  <EllipsisIcon size="4" />
                </ActionIcon>
              }
            />
          </Dialog.Header>
          <Dialog.Section>
            <Dialog.Description>
              Make changes to your profile here. Click save when you are done.
            </Dialog.Description>
          </Dialog.Section>
          <Dialog.Section className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="dialog-name"
                className="text-right"
              >
                Name
              </Label>
              <Input
                id="dialog-name"
                defaultValue="Eleven"
                variant="border"
                wrapperProps={{ className: 'col-span-3' }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="dialog-username"
                className="text-right"
              >
                Username
              </Label>
              <Input
                id="dialog-username"
                defaultValue="@eteplus"
                variant="border"
                wrapperProps={{ className: 'col-span-3' }}
              />
            </div>
          </Dialog.Section>
          <Dialog.Footer className="justify-end gap-2">
            <Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
            <Dialog.Close render={<Button>Save changes</Button>} />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
      <AlertDialog.Root>
        <AlertDialog.Trigger
          render={<Button variant="secondary-destructive">Delete account</Button>}
        />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          </AlertDialog.Header>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialog.Description>
          <AlertDialog.Footer className="justify-end gap-2">
            <AlertDialog.Cancel render={<Button variant="secondary">Cancel</Button>} />
            <AlertDialog.Action
              render={<Button variant="destructive">Yes, delete account</Button>}
            />
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <Sheet.Root>
        <Sheet.Trigger render={<Button variant="secondary">Open sheet</Button>} />
        <Sheet.Content side="right">
          <Sheet.Header className="justify-between">
            <Sheet.Title>Details</Sheet.Title>
            <Sheet.Close
              render={
                <ActionIcon
                  aria-label="Close"
                  className="-mr-2"
                >
                  <EllipsisIcon size="4" />
                </ActionIcon>
              }
            />
          </Sheet.Header>
          <div className="grid gap-4 p-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="sheet-name"
                className="text-right"
              >
                Name
              </Label>
              <Input
                id="sheet-name"
                defaultValue="Eleven"
                variant="border"
                className="col-span-3"
              />
            </div>
          </div>
          <Sheet.Footer className="justify-end">
            <Sheet.Close render={<Button className="h-7">Done</Button>} />
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet.Root>
    </Demo>
  );
}

function Popovers() {
  return (
    <>
      <Demo label="Popover">
        <Popover.Root>
          <Popover.Trigger render={<Button variant="secondary">Dimensions</Button>} />
          <Popover.Content className="w-60 p-4">
            <div className="grid gap-4">
              <h3 className="font-figma-strong leading-none">Dimensions</h3>
              <div className="grid gap-1">
                {[
                  ['width', 'Width', '100%'],
                  ['maxWidth', 'Max. width', '300px'],
                  ['height', 'Height', '25px'],
                  ['maxHeight', 'Max. height', 'none'],
                ].map(([id, label, value]) => (
                  <div
                    key={id}
                    className="grid grid-cols-3 items-center gap-1"
                  >
                    <Label htmlFor={`popover-${id}`}>{label}</Label>
                    <Input
                      id={`popover-${id}`}
                      defaultValue={value}
                      className="col-span-2"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Root>
      </Demo>
      <Demo label="Tooltip">
        <Tooltip
          content="Open settings"
          side="top"
        >
          <ActionIcon aria-label="Settings">
            <EllipsisIcon size="4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          content="Paste"
          hotkey="⌘V"
          side="top"
        >
          <ActionIcon aria-label="Paste">
            <PageIcon size="4" />
          </ActionIcon>
        </Tooltip>
      </Demo>
      <Demo label="Link tooltip">
        <LinkTooltip arrow>
          <LinkTooltipInput placeholder="Type or paste URL" />
        </LinkTooltip>
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
          <LinkTooltipItem icon={<PlayIcon size="4" />}>
            <LinkTooltipAction>Open prototype</LinkTooltipAction>
            <LinkTooltipAction>Edit</LinkTooltipAction>
          </LinkTooltipItem>
        </LinkTooltip>
      </Demo>
    </>
  );
}

export { Dialogs, Menus, Popovers };
