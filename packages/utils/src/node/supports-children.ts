export function supportsChildren(
  node: SceneNode,
): node is
  | BooleanOperationNode
  | ComponentNode
  | ComponentSetNode
  | FrameNode
  | GroupNode
  | InstanceNode
  | SectionNode {
  return (
    node.type === 'BOOLEAN_OPERATION'
    || node.type === 'COMPONENT'
    || node.type === 'COMPONENT_SET'
    || node.type === 'FRAME'
    || node.type === 'GROUP'
    || node.type === 'INSTANCE'
    || node.type === 'SECTION'
  );
}
