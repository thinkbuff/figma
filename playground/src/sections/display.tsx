import {
  AnnotationIcon,
  CheckmarkIcon,
  CircleIcon,
  ComponentIcon,
  CornerRadiusIcon,
  DesignIcon,
  DrawIcon,
  EllipsisIcon,
  EyeIcon,
  FigmaIcon,
  FrameIcon,
  LinkIcon,
  OpacityIcon,
  PlusIcon,
  SearchIcon,
  StylesIcon,
  VariableIcon,
} from '@thinkbuff/figma-react';
import { Avatar, AvatarGroup } from '@thinkbuff/figma-react/avatar';
import { Badge, BadgeDot } from '@thinkbuff/figma-react/badge';
import { Button } from '@thinkbuff/figma-react/button';
import { ScrollArea } from '@thinkbuff/figma-react/scroll-area';
import { Separator } from '@thinkbuff/figma-react/separator';
import { toast } from '@thinkbuff/figma-react/toast';
import { VisualBell } from '@thinkbuff/figma-react/visual-bell';

import { Demo } from '../demo';

function Feedback() {
  return (
    <>
      <Demo label="Toast">
        <Button
          variant="secondary"
          onClick={() => toast('Event has been created')}
        >
          Default
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              action: { label: 'Undo', onClick: () => {} },
            })
          }
        >
          Action
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.success('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            })
          }
        >
          Success
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.warning('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.error('Something went wrong', {
              action: { label: 'Retry', onClick: () => {} },
            })
          }
        >
          Error
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            toast.promise(
              new Promise<{ name: string }>((resolve) =>
                setTimeout(() => resolve({ name: 'Figma' }), 2000),
              ),
              {
                loading: 'Loading…',
                success: (data) => `${data.name} toast has been added`,
                error: 'Error',
              },
            );
          }}
        >
          Promise
        </Button>
      </Demo>
      <Demo
        label="Visual bell"
        className="flex-col items-stretch gap-3"
      >
        <VisualBell.Root>
          <VisualBell.Label icon={<CircleIcon size="6" />}>Default messaging bell</VisualBell.Label>
          <VisualBell.Actions>
            <VisualBell.Action>Action</VisualBell.Action>
            <VisualBell.Action>Dismiss</VisualBell.Action>
          </VisualBell.Actions>
          <VisualBell.Dismiss />
        </VisualBell.Root>
        {(['brand', 'success', 'component', 'danger'] as const).map((color) => (
          <VisualBell.Root
            key={color}
            color={color}
          >
            <VisualBell.Label icon={<DrawIcon size="6" />}>
              Spotlight on Tim Van Damme
            </VisualBell.Label>
            <VisualBell.Actions>
              <VisualBell.Action>Follow</VisualBell.Action>
            </VisualBell.Actions>
            <VisualBell.Dismiss />
          </VisualBell.Root>
        ))}
      </Demo>
    </>
  );
}

const avatarColors = ['purple', 'blue', 'pink', 'red', 'yellow', 'green', 'grey'] as const;

const photo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23e8def8'/%3E%3Ccircle cx='16' cy='13' r='6' fill='%239747ff'/%3E%3Cpath d='M4 32c1-7 6-10 12-10s11 3 12 10' fill='%239747ff'/%3E%3C/svg%3E";

function Avatars() {
  return (
    <>
      <Demo label="Colors and sizes">
        <div className="flex flex-col items-start gap-3">
          {(['large', 'default', 'small'] as const).map((size) => (
            <div
              key={size}
              className="flex items-center gap-2"
            >
              {avatarColors.map((color) => (
                <Avatar
                  key={color}
                  name="Ada"
                  size={size}
                  color={color}
                />
              ))}
            </div>
          ))}
        </div>
      </Demo>
      <Demo label="Photo, overflow, and group">
        <Avatar
          name="Ada Lovelace"
          src={photo}
        />
        <Avatar
          name="Ada"
          shape="square"
          color="blue"
        />
        <Avatar color="overflow-unread">+12</Avatar>
        <Avatar color="overflow-read">+8</Avatar>
        <Avatar
          name="Ada"
          color="purple"
          disabled
        />
        <AvatarGroup>
          <Avatar
            name="Ada"
            color="purple"
          />
          <Avatar
            name="Ada"
            color="blue"
          />
          <Avatar
            name="Ada"
            color="pink"
          />
          <Avatar
            name="Ada"
            color="green"
          />
        </AvatarGroup>
      </Demo>
    </>
  );
}

const badgeColors = [
  'default',
  'brand',
  'component',
  'danger',
  'warning',
  'success',
  'selected',
  'figjam',
] as const;

function Badges() {
  return (
    <>
      <Demo label="Variants">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {badgeColors.map((color) => (
            <div
              key={color}
              className="flex items-center gap-2"
            >
              <Badge
                variant="strong"
                color={color}
              >
                {color}
              </Badge>
              <Badge
                variant="light"
                color={color}
              >
                {color}
              </Badge>
            </div>
          ))}
        </div>
      </Demo>
      <Demo label="Alt, dot, and icons">
        <Badge
          variant="alt"
          color="default"
        >
          Default
        </Badge>
        <Badge
          variant="alt"
          color="count"
        >
          3
        </Badge>
        <Badge
          variant="alt"
          color="count-inactive"
        >
          12
        </Badge>
        <Badge
          variant="light"
          color="merged"
          size="large"
          icon={<span className="size-1.5 rounded-full bg-figma-icon-success" />}
        >
          Merged
        </Badge>
        <Badge
          variant="light"
          color="selected"
          icon={<CheckmarkIcon size="3" />}
        >
          Selected
        </Badge>
        <BadgeDot />
      </Demo>
    </>
  );
}

const TAGS = Array.from({ length: 40 }).map((_, i) => `v1.2.0-beta.${40 - i}`);

function Scroll() {
  return (
    <>
      <Demo
        label="Scroll area"
        className="items-start"
      >
        <ScrollArea className="h-56 w-44 rounded-figma-md border border-figma">
          <div className="flex w-full flex-col p-2">
            <div className="inline-flex h-6 items-center font-figma-strong">Tags</div>
            {TAGS.map((tag) => (
              <div
                key={tag}
                className="inline-flex h-7 items-center border-t border-figma"
              >
                {tag}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Demo>
      <Demo label="Separator">
        <div className="flex h-4 items-center gap-2">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Community</span>
        </div>
      </Demo>
    </>
  );
}

const iconSample = [
  ['Plus', PlusIcon],
  ['Ellipsis', EllipsisIcon],
  ['Search', SearchIcon],
  ['Component', ComponentIcon],
  ['Frame', FrameIcon],
  ['Figma', FigmaIcon],
  ['Variable', VariableIcon],
  ['Styles', StylesIcon],
  ['Corner radius', CornerRadiusIcon],
  ['Opacity', OpacityIcon],
  ['Link', LinkIcon],
  ['Eye', EyeIcon],
  ['Design', DesignIcon],
  ['Annotation', AnnotationIcon],
  ['Checkmark', CheckmarkIcon],
  ['Draw', DrawIcon],
] as const;

function Icons() {
  return (
    <Demo label="Bundled icons (sample)">
      <div className="grid w-full grid-cols-4 gap-x-2 gap-y-4">
        {iconSample.map(([name, Icon]) => (
          <div
            key={name}
            className="flex flex-col items-center gap-1.5"
          >
            <Icon size="6" />
            <span className="text-figma-body-medium text-figma-secondary">{name}</span>
          </div>
        ))}
      </div>
    </Demo>
  );
}

export { Avatars, Badges, Feedback, Icons, Scroll };
