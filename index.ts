export const RESET_CODE = '\x1b[0m';

export enum StyleMode { STYLE, NO_STYLE}

export function parse (strings: TemplateStringsArray, ...values: string[]) {
  return { strings, values };
}

interface ParsedTemplateString {
  strings: TemplateStringsArray,
  values: string[]
}

export function applyStyle ({ strings, values }: ParsedTemplateString, styles: (string | null)[], styleMode: StyleMode = StyleMode.STYLE) {
  if (styles.length !== values.length) {
    throw Error(`There are ${styles.length} styles but ${values.length} values!`);
  }

  if (styleMode === StyleMode.NO_STYLE) {
    return strings.reduce(
      (seed, string, i) => {
        seed += string;
        seed += values[ i ] || '';
        return seed;
      },
      '',
    );
  }

  const { value, currentStyle: lastStyle } = strings.reduce(
    (seed: { value: string, currentStyle: string }, string, i) => {
      const shouldResetStyleForString = string && seed.currentStyle !== RESET_CODE;
      const stringStyle = shouldResetStyleForString ? RESET_CODE : '';

      const value = values[ i ] || '';
      const style = styles[ i ] || RESET_CODE;
      const transitionalStyle = stringStyle || seed.currentStyle;
      const shouldStyleValue = value && transitionalStyle !== style;
      const valueStyle = shouldStyleValue ? style : '';

      seed.value += stringStyle;
      seed.value += string;
      seed.value += valueStyle;
      seed.value += value;

      seed.currentStyle = valueStyle || stringStyle || seed.currentStyle;

      return seed;
    },
    { value: '', currentStyle: RESET_CODE },
  );

  return `${value}${lastStyle !== RESET_CODE ? RESET_CODE : ''}`;
}
