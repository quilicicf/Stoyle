export const RESET_CODE = '\x1b[0m';

export enum StyleMode { STYLE, NO_STYLE}

export function parse (strings: TemplateStringsArray, ...values: string[]) {
  return { strings, values };
}

interface ParsedTemplateString {
  strings: TemplateStringsArray,
  values: string[]
}

export function applyStyle (input: ParsedTemplateString | string, styles: (string | null)[], styleMode: StyleMode = StyleMode.STYLE) {
  const { strings, values } = typeof input === 'string'
    ? { strings: [ '' ], values: [ input ] }
    : { strings: [ ...input.strings ], values: input.values };

  if (styles.length !== values.length) {
    throw Error(`I found ${styles.length} style(s) but ${values.length} value(s)!`);
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
