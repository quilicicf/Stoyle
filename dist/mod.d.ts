declare type Maybe<T> = T | undefined;
/**************
 * ANSI CODES *
 *************/
export declare const RESET_CODE: number;
export declare enum ForegroundSimpleCode {
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
    FG_Bright_White = 97
}
export declare enum BackgroundSimpleCode {
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
    BG_Bright_White = 107
}
export declare enum DecorationCode {
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
export declare class RgbCode {
    red: number;
    green: number;
    blue: number;
    constructor(red: number, green: number, blue: number);
}
export declare class ForegroundRgbCode extends RgbCode {
    toString(): string;
}
export declare class BackgroundRgbCode extends RgbCode {
    toString(): string;
}
export declare type ForegroundCode = ForegroundSimpleCode | ForegroundRgbCode;
export declare type BackgroundCode = BackgroundSimpleCode | BackgroundRgbCode;
export interface Style {
    color?: ForegroundCode;
    backgroundColor?: BackgroundCode;
    decoration?: DecorationCode;
}
export declare function styleToAnsiCode({ color, backgroundColor, decoration }: Style, shouldResetFirst?: boolean): string;
/*******************
 * APPLYING STYLES *
 ******************/
export declare enum StyleMode {
    STYLE = 0,
    NO_STYLE = 1
}
interface StylesToApply {
    global?: Style;
    edges?: Maybe<Style>[];
    nodes?: Maybe<Style>[];
}
declare type GlobalStyler = (style: Style, styleMode?: StyleMode) => string;
declare type Styler = (stylesToApply: StylesToApply, styleMode?: StyleMode) => string;
export declare function stoyleString(input: string, style: Style, styleMode?: StyleMode): string;
export declare function stoyleGlobal(edgesAsTemplateStringArray: TemplateStringsArray, ...nodes: any[]): GlobalStyler;
export declare function stoyle(edgesAsTemplateStringArray: TemplateStringsArray, ...nodes: any[]): Styler;
export {};
