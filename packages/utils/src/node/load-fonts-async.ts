export const DEFAULT_FONT_STYLES = [
  'Thin',
  'Extra Light',
  'Light',
  'Regular',
  'Medium',
  'Semi Bold',
  'Bold',
  'Extra Bold',
  'Black',
  'Thin Italic',
  'Extra Light Italic',
  'Light Italic',
  'Regular Italic',
  'Medium Italic',
  'Semi Bold Italic',
  'Bold Italic',
  'Extra Bold Italic',
  'Black Italic',
];

/**
 * Loads fonts asynchronously for a given TextNode and font styles.
 *
 * @param node - The TextNode to load fonts for.
 * @param fontStyles - An array of font styles to load.
 * @return A promise that resolves when the fonts are loaded.
 */
export async function loadFontsAsync(node: TextNode, fontStyles: string[] = []) {
  try {
    if (node.characters.length > 0) {
      const fontNames = node.getRangeAllFontNames(0, node.characters.length);

      await Promise.allSettled(fontNames.map(fontName => figma.loadFontAsync(fontName)));
    }

    if (node.hasMissingFont) {
      const style = node.fontName === figma.mixed ? 'Regular' : node.fontName.style;
      const fontName = {
        family: 'Inter',
        style: DEFAULT_FONT_STYLES.includes(style) || fontStyles.includes(style) ? style : 'Regular',
      };

      await figma.loadFontAsync(fontName);
      node.fontName = fontName;
    }
  } catch (error) {
    console.warn('loadFontAsync', error);
  }
}
