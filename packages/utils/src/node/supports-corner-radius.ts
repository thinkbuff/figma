export function supportsCornerRadius(
  node: SceneNode,
): node is
  | BooleanOperationNode
  | ComponentNode
  | ComponentSetNode
  | EllipseNode
  | FrameNode
  | HighlightNode
  | InstanceNode
  | PolygonNode
  | RectangleNode
  | StarNode
  | VectorNode {
  return (
    node.type === 'BOOLEAN_OPERATION'
    || node.type === 'COMPONENT'
    || node.type === 'COMPONENT_SET'
    || node.type === 'ELLIPSE'
    || node.type === 'FRAME'
    || node.type === 'HIGHLIGHT'
    || node.type === 'INSTANCE'
    || node.type === 'POLYGON'
    || node.type === 'RECTANGLE'
    || node.type === 'STAR'
    || node.type === 'VECTOR'
  );
}
