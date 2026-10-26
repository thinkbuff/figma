import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { ContextMenu } from '~/components/context-menu/index';

function TriggerBox(props: React.ComponentPropsWithRef<'div'>) {
  return <div {...props}>Right click here</div>;
}

function Fixture() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger render={<TriggerBox />} />
      <ContextMenu.Content>
        <ContextMenu.Item>Paste here</ContextMenu.Item>
        <ContextMenu.Item>Duplicate</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}

describe('ContextMenu', () => {
  it('opens the menu on right-click', async () => {
    await render(<Fixture />);
    const trigger = page.getByText('Right click here');
    trigger
      .element()
      .dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 20, clientY: 20 }));
    await expect.poll(() => page.getByRole('menu').query()).not.toBeNull();
    await expect
      .poll(() => page.getByRole('menuitem', { name: 'Paste here' }).query())
      .not.toBeNull();
  });
});
