import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { Avatar, AvatarGroup } from '~/components/avatar/avatar';

describe('Avatar', () => {
  it('renders the name initial on a palette color', async () => {
    const { container } = await render(<Avatar name="Ada" />);
    const avatar = container.querySelector('[role="img"]') as HTMLElement;
    expect(avatar.textContent).toBe('A');
    expect(avatar.className).toContain('bg-[#9747ff]');
    expect(avatar.getAttribute('aria-label')).toBe('Ada');
  });

  it('renders a photo when src is provided', async () => {
    const { container } = await render(
      <Avatar
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
        name="Ada"
      />,
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('alt')).toBe('Ada');
  });

  it('applies size and square shape', async () => {
    const { container } = await render(
      <Avatar
        name="Ada"
        size="small"
        shape="square"
      />,
    );
    const avatar = container.querySelector('[role="img"]') as HTMLElement;
    expect(avatar.className).toContain('size-4');
    expect(avatar.className).toContain('rounded-figma-md');
  });

  it('groups avatars in a pill', async () => {
    const { container } = await render(
      <AvatarGroup data-testid="group">
        <Avatar name="A" />
        <Avatar name="B" />
      </AvatarGroup>,
    );
    const group = container.querySelector('[data-testid="group"]') as HTMLElement;
    expect(group.querySelectorAll('[role="img"]')).toHaveLength(2);
    expect(group.className).toContain('rounded-full');
  });
});
