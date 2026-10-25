import {
  docsThemeTokenSource,
  localThemeTokenSource,
  parseThemeTokenName,
  type ThemeColorScope,
  type ThemeTokenName,
} from './tokens';
import { isExposedLocalThemeToken, semanticUtilities } from './utility-contract';

const docsThemeVariableNames = Array.from(
  new Set(Object.values(docsThemeTokenSource.themes).flatMap((tokens) => Object.keys(tokens))),
).sort() as ThemeTokenName[];

const localThemeVariableNames = Object.keys(localThemeTokenSource.shared)
  .filter((variableName): variableName is ThemeTokenName =>
    Boolean(parseThemeTokenName(variableName)),
  )
  .filter((variableName) => isExposedLocalThemeToken(variableName));

const themeVariableNames = Array.from(
  new Set([...docsThemeVariableNames, ...localThemeVariableNames]),
).sort() as ThemeTokenName[];

type UtilityDefinition = {
  property: string;
  utilityName: string;
  withScope: boolean;
};

const UTILITY_PROPERTIES: Record<string, string> = {
  bg: 'background-color',
  text: 'color',
  border: 'border-color',
  outline: 'outline-color',
  fill: 'fill',
  stroke: 'stroke',
};

const UTILITY_NAMES = ['bg', 'text', 'border', 'outline', 'fill', 'stroke'] as const;

/**
 * Every color token emits the full cross-scope family:
 * `<utility>-figma-<scope>[-suffix]` -> `property: var(--figma-color-<scope>[-suffix])`,
 * plus the scope's own unscoped name (`bg-figma-*`, `text-figma-*`, `border-figma-*`).
 */
const scopedUtilityDefinitions: Record<ThemeColorScope, UtilityDefinition[]> = {
  bg: [
    { utilityName: 'bg', property: 'background-color', withScope: false },
    ...UTILITY_NAMES.map((utilityName) => ({
      utilityName,
      property: UTILITY_PROPERTIES[utilityName],
      withScope: true,
    })),
  ],
  border: [
    { utilityName: 'border', property: 'border-color', withScope: false },
    ...UTILITY_NAMES.map((utilityName) => ({
      utilityName,
      property: UTILITY_PROPERTIES[utilityName],
      withScope: true,
    })),
  ],
  icon: UTILITY_NAMES.map((utilityName) => ({
    utilityName,
    property: UTILITY_PROPERTIES[utilityName],
    withScope: true,
  })),
  text: [
    { utilityName: 'text', property: 'color', withScope: false },
    ...UTILITY_NAMES.map((utilityName) => ({
      utilityName,
      property: UTILITY_PROPERTIES[utilityName],
      withScope: true,
    })),
  ],
};

function toUtilityBlock(name: string, declarations: string | string[]) {
  const normalizedDeclarations = Array.isArray(declarations) ? declarations : [declarations];

  return `@utility ${name} {
${normalizedDeclarations.map((declaration) => `  ${declaration}`).join('\n')}
}`;
}

function toUtilityName(
  utilityName: string,
  scope: ThemeColorScope,
  suffix: string,
  withScope: boolean,
) {
  const parts = [utilityName, 'figma'];

  if (withScope) {
    parts.push(scope);
  }

  if (suffix) {
    parts.push(suffix);
  }

  return parts.join('-');
}

function generateColorUtilities() {
  return themeVariableNames
    .flatMap((variableName) => {
      const descriptor = parseThemeTokenName(variableName);

      if (!descriptor) {
        return [];
      }

      return scopedUtilityDefinitions[descriptor.scope].map((definition) => {
        const utilityClassName = toUtilityName(
          definition.utilityName,
          descriptor.scope,
          descriptor.suffix,
          definition.withScope,
        );

        return toUtilityBlock(utilityClassName, `${definition.property}: var(${variableName});`);
      });
    })
    .join('\n\n');
}

function generateSemanticUtilities() {
  return Object.entries(semanticUtilities)
    .map(([utilityName, declaration]) => toUtilityBlock(utilityName, declaration))
    .join('\n\n');
}

export function generateThemeUtilitiesCSS() {
  return [generateColorUtilities(), generateSemanticUtilities()].join('\n\n');
}
