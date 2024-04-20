export function supportsAutoLayout(
  node: SceneNode,
): node is ComponentNode | ComponentSetNode | FrameNode | InstanceNode {
  return (
    node.type === 'COMPONENT'
    || node.type === 'COMPONENT_SET'
    || node.type === 'FRAME'
    || node.type === 'INSTANCE'
  );
}
