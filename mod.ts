type Maybe<T> = T | undefined;

/**************
 * ANSI CODES *
 *************/

export const RESET_CODE: number = 0;

// noinspection JSUnusedGlobalSymbols
export enum ForegroundSimpleCode {
  FG_Black = 30,
  FG_Red = 31,
  FG_Green = 32,
  FG_Yellow = 33,
  FG_Blue = 34,
  FG_Magenta = 35,
  FG_Cyan = 36,
  FG_White = 37,
  FG_Bright_Black = 90,
  FG_Bright_Red = 91,
  FG_Bright_Green = 92,
  FG_Bright_Yellow = 93,
  FG_Bright_Blue = 94,
  FG_Bright_Magenta = 95,
  FG_Bright_Cyan = 96,
  FG_Bright_White = 97,
}

// noinspection JSUnusedGlobalSymbols
export enum BackgroundSimpleCode {
  BG_Black = 40,
  BG_Red = 41,
  BG_Green = 42,
  BG_Yellow = 43,
  BG_Blue = 44,
  BG_Magenta = 45,
  BG_Cyan = 46,
  BG_White = 47,
  BG_Bright_Black = 100,
  BG_Bright_Red = 101,
  BG_Bright_Green = 102,
  BG_Bright_Yellow = 103,
  BG_Bright_Blue = 104,
  BG_Bright_Magenta = 105,
  BG_Bright_Cyan = 106,
  BG_Bright_White = 107,
}

// noinspection JSUnusedGlobalSymbols
export enum DecorationCode {
  Bold = 1,
  Dim = 2,
  Italic = 3,
  Underline = 4,
  Blink_Slow = 5,
  Blink_Fast = 6,
  Reverse_Video = 7,
  Conceal = 8,
  Crossed_Out = 9,
  Primary = 10,
  Alternative_Font_1 = 11,
  Alternative_Font_2 = 12,
  Alternative_Font_3 = 13,
  Alternative_Font_4 = 14,
  Alternative_Font_5 = 15,
  Alternative_Font_6 = 16,
  Alternative_Font_7 = 17,
  Alternative_Font_8 = 18,
  Alternative_Font_9 = 19,
  Fraktur = 20,
  Double_Underline = 21,
  Normal = 22,
  Italic_And_Fraktur_Off = 23,
  Underline_Off = 24,
  Blink_Off = 25,
  Proportional_Spacing = 26,
  Reverse_And_Invert_Off = 27,
  Reveal_And_Conceal_Off = 28,
  Crossed_Off = 29
}

function checkRgbRange (code: number) {
  if (code < 0 || code > 255) {
    throw Error(`RGB codes should be between 0 & 255, got: ${code}`);
  }
  return code;
}

export class RgbCode {
  red: number;
  green: number;
  blue: number;

  constructor (red: number, green: number, blue: number) {
    this.red = checkRgbRange(red);
    this.green = checkRgbRange(green);
    this.blue = checkRgbRange(blue);
  }
}

export class ForegroundRgbCode extends RgbCode {
  override toString () {
    return `38;2;${this.red};${this.green};${this.blue}`;
  }
}

export class BackgroundRgbCode extends RgbCode {
  override toString () {
    return `48;2;${this.red};${this.green};${this.blue}`;
  }
}

export type ForegroundCode = ForegroundSimpleCode | ForegroundRgbCode;
export type BackgroundCode = BackgroundSimpleCode | BackgroundRgbCode;

export interface Style {
  color?: ForegroundCode,
  backgroundColor?: BackgroundCode,
  decoration?: DecorationCode,
}

export function styleToAnsiCode ({ color, backgroundColor, decoration }: Style, shouldResetFirst: boolean = false): string {
  const codes = [
    ...(shouldResetFirst ? [ RESET_CODE ] : []),
    color,
    backgroundColor,
    decoration,
  ].filter((code) => (typeof code === 'number' || typeof code === 'object'));
  return codes.length === 0 ? '' : `\x1b[${codes.join(';')}m`;
}

/*******************
 * APPLYING STYLES *
 ******************/

export enum StyleMode { STYLE, NO_STYLE}

interface StylesToApply {
  global?: Style,
  edges?: Maybe<Style>[],
  nodes?: Maybe<Style>[],
}

type GlobalStyler = (style: Style, styleMode?: StyleMode) => string;

type Styler = (stylesToApply: StylesToApply, styleMode?: StyleMode) => string;

interface Fragment {
  string: string,
  shouldResetFirst: boolean,
  style: Maybe<Style>,
}

interface Accumulator {
  currentStyle: Style,
  fragments: Fragment[],
}

function areStylesEqual (style1: Style, style2: Style): boolean {
  return style1.color === style2.color
    && style1.backgroundColor === style2.backgroundColor
    && style1.decoration === style2.decoration;
}

function computeNextFragment (string: string, lastStyle: Style, styleToApply: Maybe<Style>): Fragment {
  if (!styleToApply || areStylesEqual(styleToApply, lastStyle)) { return { string, shouldResetFirst: false, style: undefined }; }

  const shouldRemoveOldColor = !!lastStyle.color && !styleToApply.color;
  const shouldRemoveOldBackgroundColor = !!lastStyle.backgroundColor && !styleToApply.backgroundColor;
  const shouldRemoveOldDecoration = !!lastStyle.decoration && styleToApply.decoration !== lastStyle.decoration;
  const shouldResetFirst = shouldRemoveOldColor || shouldRemoveOldBackgroundColor || shouldRemoveOldDecoration;

  return { // Colors are reset if unset
    string,
    shouldResetFirst,
    style: {
      color: shouldResetFirst || styleToApply.color !== lastStyle.color ? styleToApply.color : undefined,
      backgroundColor: shouldResetFirst || styleToApply.backgroundColor !== lastStyle.backgroundColor ? styleToApply.backgroundColor : undefined,
      decoration: shouldResetFirst || styleToApply.decoration !== lastStyle.decoration ? styleToApply.decoration : undefined,
    },
  };
}

function computeNextCode<T> (lastCode: Maybe<T>, newCode: Maybe<T>, hasReset: boolean): Maybe<T> {
  if (newCode) { return newCode; }
  return hasReset || !lastCode ? undefined : lastCode;
}

function printFragmentStyle (fragment: Fragment) {
  return fragment.style ? styleToAnsiCode(fragment.style, fragment.shouldResetFirst) : '';
}

function getString (index: number, edges: string[], nodes: any[]): string {
  const isEven = index % 2 === 0;
  const halfIndex = ~~(index / 2);
  return String(
    isEven ? edges[ halfIndex ] : nodes[ halfIndex ],
  );
}

function getSpecificStyle (index: number, styles: StylesToApply): Maybe<Style> {
  const isEven = index % 2 === 0;
  const halfIndex = ~~(index / 2);
  return isEven ? styles?.edges?.[ halfIndex ] : styles?.nodes?.[ halfIndex ];
}

export function stoyleString (input: string, style: Style, styleMode: StyleMode = StyleMode.STYLE): string {
  return styleMode === StyleMode.NO_STYLE
    ? input
    : styleToAnsiCode(style) + input + styleToAnsiCode({}, true);
}

export function stoyleGlobal (edgesAsTemplateStringArray: TemplateStringsArray, ...nodes: any[]): GlobalStyler {
  const edges = [ ...edgesAsTemplateStringArray ];
  return (style: Style, styleMode: StyleMode = StyleMode.STYLE) => {
    const wholeString = new Array(edges.length + nodes.length)
      .fill(null)
      .map((whatever, index) => getString(index, edges, nodes))
      .join('');
    return stoyleString(wholeString, style, styleMode);
  };
}

export function stoyle (edgesAsTemplateStringArray: TemplateStringsArray, ...nodes: any[]): Styler {
  const edges = [ ...edgesAsTemplateStringArray ];
  return (styles: StylesToApply, styleMode: StyleMode = StyleMode.STYLE) => {
    if (styles.edges && edges.length !== styles.edges?.length) {
      throw Error(`I found ${edges.length} edge(s), but ${styles.edges?.length} edge style(s)!`);
    }

    if (styles.nodes && nodes.length !== styles.nodes?.length) {
      throw Error(`I found ${nodes.length} node(s), but ${styles.nodes?.length} node style(s)!`);
    }

    const globalStyle = styles?.global ?? {}; // Defaults to no style
    const accumulator: Accumulator = new Array(edges.length + nodes.length)
      .fill(null)
      .reduce(
        (seed: Accumulator, whatever, index) => {
          const string = getString(index, edges, nodes);

          if (!string) { return seed; } // Nothing to write for empty strings

          const specificStyle = getSpecificStyle(index, styles);
          const styleToApply = specificStyle ?? globalStyle; // Specific styles supersede global style
          const fragment: Fragment = styleMode === StyleMode.NO_STYLE
            ? { string, shouldResetFirst: false, style: {} }
            : computeNextFragment(string, seed.currentStyle, styleToApply);

          seed.fragments.push(fragment);
          seed.currentStyle = {
            color: computeNextCode(seed.currentStyle.color, fragment?.style?.color, fragment.shouldResetFirst),
            backgroundColor: computeNextCode(seed.currentStyle.backgroundColor, fragment?.style?.backgroundColor, fragment.shouldResetFirst),
            decoration: computeNextCode(seed.currentStyle.decoration, fragment?.style?.decoration, fragment.shouldResetFirst),
          };
          return seed;
        },
        {
          currentStyle: {},
          fragments: [],
        } as Accumulator,
      );

    const { fragments, currentStyle: lastStyle } = accumulator;

    const shouldCleanup = !!lastStyle.color
      || !!lastStyle.backgroundColor
      || !!lastStyle.decoration;

    const allFragments = shouldCleanup
      ? fragments.concat({ string: '', shouldResetFirst: true, style: {} })
      : fragments;

    return allFragments
      .map((fragment: Fragment) => printFragmentStyle(fragment) + fragment.string)
      .join('');
  };
}
