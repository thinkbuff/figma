export function supportsStroke(
  node: SceneNode,
): node is
  | BooleanOperationNode
  | ComponentNode
  | ComponentSetNode
  | ConnectorNode
  | EllipseNode
  | FrameNode
  | HighlightNode
  | InstanceNode
  | LineNode
  | PolygonNode
  | RectangleNode
  | ShapeWithTextNode
  | StampNode
  | StarNode
  | TextNode
  | VectorNode
  | WashiTapeNode {
  return (
    node.type === 'BOOLEAN_OPERATION'
    || node.type === 'COMPONENT'
    || node.type === 'COMPONENT_SET'
    || node.type === 'CONNECTOR'
    || node.type === 'ELLIPSE'
    || node.type === 'FRAME'
    || node.type === 'HIGHLIGHT'
    || node.type === 'INSTANCE'
    || node.type === 'LINE'
    || node.type === 'POLYGON'
    || node.type === 'RECTANGLE'
    || node.type === 'SHAPE_WITH_TEXT'
    || node.type === 'STAMP'
    || node.type === 'STAR'
    || node.type === 'TEXT'
    || node.type === 'VECTOR'
    || node.type === 'WASHI_TAPE'
  );
}
