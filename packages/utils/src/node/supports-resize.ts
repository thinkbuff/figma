export function supportsResize(
  node: SceneNode,
): node is
  | BooleanOperationNode
  | ComponentNode
  | ComponentSetNode
  | EllipseNode
  | FrameNode
  | GroupNode
  | HighlightNode
  | InstanceNode
  | LineNode
  | PolygonNode
  | RectangleNode
  | SliceNode
  | StampNode
  | StarNode
  | TextNode
  | VectorNode
  | WashiTapeNode {
  return (
    node.type === 'BOOLEAN_OPERATION'
    || node.type === 'COMPONENT'
    || node.type === 'COMPONENT_SET'
    || node.type === 'ELLIPSE'
    || node.type === 'FRAME'
    || node.type === 'GROUP'
    || node.type === 'HIGHLIGHT'
    || node.type === 'INSTANCE'
    || node.type === 'LINE'
    || node.type === 'POLYGON'
    || node.type === 'RECTANGLE'
    || node.type === 'SLICE'
    || node.type === 'STAMP'
    || node.type === 'STAR'
    || node.type === 'TEXT'
    || node.type === 'VECTOR'
    || node.type === 'WASHI_TAPE'
  );
}
