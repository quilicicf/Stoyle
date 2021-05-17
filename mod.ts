type Maybe<T> = T | undefined;

/**************
 * ANSI CODES *
 *************/

export enum ForegroundSimpleCode {
  FG_Black = 30,
  FG_Red = 31,
  FG_Green = 32,
  FG_Yellow = 33,
  FG_Blue = 34,
  FG_Magenta = 35,
  FG_Cyan = 36,
  FG_White = 37,
  FG_Default = 39,
  FG_Bright_Black = 90,
  FG_Bright_Red = 91,
  FG_Bright_Green = 92,
  FG_Bright_Yellow = 93,
  FG_Bright_Blue = 94,
  FG_Bright_Magenta = 95,
  FG_Bright_Cyan = 96,
  FG_Bright_White = 97,
}

export enum BackgroundSimpleCode {
  BG_Black = 40,
  BG_Red = 41,
  BG_Green = 42,
  BG_Yellow = 43,
  BG_Blue = 44,
  BG_Magenta = 45,
  BG_Cyan = 46,
  BG_White = 47,
  BG_Default = 49,
  BG_Bright_Black = 100,
  BG_Bright_Red = 101,
  BG_Bright_Green = 102,
  BG_Bright_Yellow = 103,
  BG_Bright_Blue = 104,
  BG_Bright_Magenta = 105,
  BG_Bright_Cyan = 106,
  BG_Bright_White = 107,
}

export enum DecorationCode {
  Default = 0, // Also called reset, changed for consistency with colors
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
  toString () {
    return `38;2;${this.red};${this.green};${this.blue}`;
  }
}

export class BackgroundRgbCode extends RgbCode {
  toString () {
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

export function styleToAnsiCode ({ color, backgroundColor, decoration }: Style): string {
  const codes = [ color, backgroundColor, decoration ].filter((code) => (
    typeof code === 'number' || typeof code === 'object'
  ));
  return codes.length === 0 ? '' : `\x1b[${codes.join(';')}m`;
}

/*******************
 * PARSING STRINGS *
 ******************/

interface ParsedTemplateString {
  edges: TemplateStringsArray,
  nodes: string[],
}

export function parse (edges: TemplateStringsArray, ...nodes: string[]): ParsedTemplateString {
  return { edges, nodes };
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

interface DecorationChanger {
  shouldResetFirst: boolean,
  decoration: Maybe<DecorationCode>,
}

interface FragmentStyle {
  color?: Maybe<ForegroundCode>,
  backgroundColor?: Maybe<BackgroundCode>,
  decorationChanger?: Maybe<DecorationChanger>,
}

interface Fragment {
  string: string,
  style: FragmentStyle,
}

interface Accumulator {
  currentColor: ForegroundCode,
  currentBackgroundColor: BackgroundCode,
  currentDecoration: DecorationCode,
  fragments: Fragment[],
}

function computeNextColorCode<T> (resetCode: any, previousCode: T, codeToApply: Maybe<T>): Maybe<T> {
  if (!codeToApply) {
    return previousCode === resetCode ? undefined : resetCode;
  }
  return codeToApply === previousCode ? undefined : codeToApply;
}

function computeNextDecorationCode (resetCode: any, previousCode: DecorationCode, codeToApply: Maybe<DecorationCode>): Maybe<DecorationChanger> {
  if (!codeToApply) {
    return previousCode === resetCode ? undefined : { shouldResetFirst: false, decoration: resetCode };
  }
  return codeToApply === previousCode ? undefined : { shouldResetFirst: previousCode !== resetCode, decoration: codeToApply };
}

function fragmentStyleToAnsiCode (fragmentStyle: FragmentStyle) {
  if (!fragmentStyle.decorationChanger) { return styleToAnsiCode(fragmentStyle); }

  const resetStyleString = styleToAnsiCode({ decoration: DecorationCode.Default });
  const styleString = styleToAnsiCode({ ...fragmentStyle, decoration: fragmentStyle.decorationChanger.decoration });
  return fragmentStyle.decorationChanger.shouldResetFirst ? resetStyleString + styleString : styleString;
}

export function style (input: ParsedTemplateString | string,
                       styles: StylesToApply = {},
                       styleMode: StyleMode = StyleMode.STYLE) {
  const { edges, nodes } = typeof input === 'string'
    ? { edges: [ input ], nodes: [] }
    : { edges: [ ...input.edges ], nodes: input.nodes };

  if (edges[ 0 ] === '' && styles.edges) { styles.edges.unshift({}); } // TODO: should I?
  if (edges[ edges.length - 1 ] === '' && styles.edges) { styles.edges.push({}); }

  if (styles.edges && edges.length !== styles.edges?.length) {
    throw Error(`I found ${edges.length} edge(s), but ${styles.edges?.length} edge style(s)!`);
  }

  if (styles.nodes && nodes.length !== styles.nodes?.length) {
    throw Error(`I found ${nodes.length} node(s), but ${styles.nodes?.length} node style(s)!`);
  }

  const accumulator: Accumulator = new Array(edges.length + nodes.length)
    .fill(null)
    .reduce(
      (seed: Accumulator, whatever, index) => {
        const isEven = index % 2 === 0;
        const halfIndex = ~~(index / 2);
        const string = isEven ? edges[ halfIndex ] : nodes[ halfIndex ];

        if (!string) { return seed; } // Nothing to write for empty strings

        const specificStyle = isEven ? styles?.edges?.[ halfIndex ] : styles?.nodes?.[ halfIndex ];
        const styleToApply = specificStyle || styles?.global; // Specific styles supersede global style
        const color: Maybe<ForegroundCode> = computeNextColorCode(ForegroundSimpleCode.FG_Default, seed.currentColor, styleToApply?.color);
        const backgroundColor: Maybe<BackgroundCode> = computeNextColorCode(BackgroundSimpleCode.BG_Default, seed.currentBackgroundColor, styleToApply?.backgroundColor);
        const decorationChanger: Maybe<DecorationChanger> = computeNextDecorationCode(DecorationCode.Default, seed.currentDecoration, styleToApply?.decoration);

        const fragment: Fragment = styleMode === StyleMode.NO_STYLE
          ? { string, style: {} }
          : { string, style: { color, backgroundColor, decorationChanger: decorationChanger } };

        seed.fragments.push(fragment);
        seed.currentColor = color || seed.currentColor;
        seed.currentBackgroundColor = backgroundColor || seed.currentBackgroundColor;
        seed.currentDecoration = decorationChanger?.decoration === undefined ? seed.currentDecoration : decorationChanger?.decoration;

        return seed;
      },
      {
        currentColor: ForegroundSimpleCode.FG_Default,
        currentBackgroundColor: BackgroundSimpleCode.BG_Default,
        currentDecoration: DecorationCode.Default,
        fragments: [],
      } as Accumulator,
    );

  const {
    fragments,
    currentColor: lastColor,
    currentBackgroundColor: lastBackgroundColor,
    currentDecoration: lastDecoration,
  } = accumulator;

  const cleanupFragment: Fragment = {
    string: '',
    style: {
      color: lastColor === ForegroundSimpleCode.FG_Default ? undefined : ForegroundSimpleCode.FG_Default,
      backgroundColor: lastBackgroundColor === BackgroundSimpleCode.BG_Default ? undefined : BackgroundSimpleCode.BG_Default,
      decorationChanger: {
        shouldResetFirst: false,
        decoration: lastDecoration === DecorationCode.Default ? undefined : DecorationCode.Default,
      },
    },
  };

  return fragments.concat(cleanupFragment)
    .map((fragment: Fragment) => fragmentStyleToAnsiCode(fragment.style) + fragment.string)
    .join('');
}
