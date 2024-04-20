/**
 * Clones the given nodes to the maximum specified number.
 * If the number of nodes is already equal to or greater than the maximum, an empty array is returned.
 *
 * @param nodes - The nodes to be cloned.
 * @param maximum - The maximum number of clones to create.
 * @returns An array of cloned nodes.
 */
export function cloneNodesToMaximum(nodes: SceneNode[], maximum: number) {
  if (nodes.length >= maximum) {
    return [];
  }

  const clonedNodes: SceneNode[] = [];
  for (let i = nodes.length; i < maximum; i++) {
    const node = nodes[i % nodes.length];
    const clonedNode = node.clone();
    clonedNode.visible = false;
    clonedNodes.push(clonedNode);
    node?.parent?.appendChild?.(clonedNode);
  }

  return clonedNodes;
}
