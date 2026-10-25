import { describe, expect, it } from 'vitest';

import { supportsAutoLayout } from './supports-auto-layout';
import { supportsChildren } from './supports-children';
import { supportsCornerRadius } from './supports-corner-radius';
import { supportsFill } from './supports-fill';
import { supportsResize } from './supports-resize';
import { supportsStroke } from './supports-stroke';
import { supportsStrokeMixed } from './supports-stroke-mixed';

function node(type: string): SceneNode {
  return JSON.parse(`{ "type": "${type}" }`);
}

describe('supportsAutoLayout', () => {
  it.each(['COMPONENT', 'COMPONENT_SET', 'FRAME', 'INSTANCE'])('returns true for %s', (type) => {
    expect(supportsAutoLayout(node(type))).toBe(true);
  });

  it.each(['RECTANGLE', 'TEXT', 'GROUP', 'SECTION'])('returns false for %s', (type) => {
    expect(supportsAutoLayout(node(type))).toBe(false);
  });
});

describe('supportsChildren', () => {
  it.each(['BOOLEAN_OPERATION', 'COMPONENT', 'COMPONENT_SET', 'FRAME', 'GROUP', 'INSTANCE', 'SECTION'])(
    'returns true for %s',
    (type) => {
      expect(supportsChildren(node(type))).toBe(true);
    },
  );

  it.each(['RECTANGLE', 'TEXT', 'LINE', 'VECTOR'])('returns false for %s', (type) => {
    expect(supportsChildren(node(type))).toBe(false);
  });
});

describe('supportsCornerRadius', () => {
  it.each(['RECTANGLE', 'ELLIPSE', 'FRAME', 'STAR', 'VECTOR', 'INSTANCE'])(
    'returns true for %s',
    (type) => {
      expect(supportsCornerRadius(node(type))).toBe(true);
    },
  );

  it.each(['TEXT', 'LINE', 'SECTION', 'GROUP'])('returns false for %s', (type) => {
    expect(supportsCornerRadius(node(type))).toBe(false);
  });
});

describe('supportsFill', () => {
  it.each(['RECTANGLE', 'FRAME', 'TEXT', 'STICKY', 'TABLE', 'VECTOR'])(
    'returns true for %s',
    (type) => {
      expect(supportsFill(node(type))).toBe(true);
    },
  );

  it.each(['GROUP', 'CONNECTOR', 'SLICE'])('returns false for %s', (type) => {
    expect(supportsFill(node(type))).toBe(false);
  });
});

describe('supportsResize', () => {
  it.each(['RECTANGLE', 'FRAME', 'GROUP', 'TEXT', 'SLICE'])('returns true for %s', (type) => {
    expect(supportsResize(node(type))).toBe(true);
  });

  it.each(['SECTION', 'STICKY', 'TABLE'])('returns false for %s', (type) => {
    expect(supportsResize(node(type))).toBe(false);
  });
});

describe('supportsStroke', () => {
  it.each(['RECTANGLE', 'CONNECTOR', 'LINE', 'TEXT', 'VECTOR'])('returns true for %s', (type) => {
    expect(supportsStroke(node(type))).toBe(true);
  });

  it.each(['SECTION', 'STICKY', 'TABLE'])('returns false for %s', (type) => {
    expect(supportsStroke(node(type))).toBe(false);
  });
});

describe('supportsStrokeMixed', () => {
  it.each(['COMPONENT', 'COMPONENT_SET', 'FRAME', 'INSTANCE', 'RECTANGLE'])(
    'returns true for %s',
    (type) => {
      expect(supportsStrokeMixed(node(type))).toBe(true);
    },
  );

  it.each(['TEXT', 'LINE', 'GROUP', 'VECTOR'])('returns false for %s', (type) => {
    expect(supportsStrokeMixed(node(type))).toBe(false);
  });
});
