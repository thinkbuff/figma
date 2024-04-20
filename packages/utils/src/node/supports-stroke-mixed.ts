export function supportsStrokeMixed(
  node: SceneNode,
): node is ComponentNode | ComponentSetNode | FrameNode | InstanceNode | RectangleNode {
  return (
    node.type === 'COMPONENT'
    || node.type === 'COMPONENT_SET'
    || node.type === 'FRAME'
    || node.type === 'INSTANCE'
    || node.type === 'RECTANGLE'
  );
}
