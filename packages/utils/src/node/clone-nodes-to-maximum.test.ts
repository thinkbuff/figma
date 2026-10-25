import { describe, expect, it, vi } from 'vitest';

import { cloneNodesToMaximum } from './clone-nodes-to-maximum';

function makeNode() {
  const parent = { appendChild: vi.fn<() => void>() };
  const node = {
    clone: vi.fn<() => object>(() => ({ visible: true })),
    parent,
  };
  return node as unknown as FrameNode & { clone: ReturnType<typeof vi.fn> };
}

describe('cloneNodesToMaximum', () => {
  it('returns an empty array when nodes already meet the maximum', () => {
    const nodes = [makeNode(), makeNode()];

    expect(cloneNodesToMaximum(nodes, 2)).toEqual([]);
    expect(cloneNodesToMaximum(nodes, 1)).toEqual([]);
  });

  it('clones nodes until the maximum is reached', () => {
    const nodes = [makeNode(), makeNode()];
    const cloned = cloneNodesToMaximum(nodes, 5);

    expect(cloned).toHaveLength(3);
    expect(nodes[0]!.clone).toHaveBeenCalled();
  });

  it('cycles through the source nodes when cloning', () => {
    const a = makeNode();
    const b = makeNode();
    const cloned = cloneNodesToMaximum([a, b], 5);

    expect(a.clone).toHaveBeenCalledTimes(2);
    expect(b.clone).toHaveBeenCalledTimes(1);
    expect(cloned).toHaveLength(3);
  });

  it('hides cloned nodes and appends them to the parent', () => {
    const parent = { appendChild: vi.fn<() => void>() };
    const clone = { visible: true };
    const node = {
      clone: vi.fn<() => object>(() => clone),
      parent,
    } as unknown as FrameNode;

    const cloned = cloneNodesToMaximum([node], 2);

    expect(cloned[0]!.visible).toBe(false);
    expect(parent.appendChild).toHaveBeenCalledWith(clone);
  });
});
