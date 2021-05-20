import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import {
  RESET_CODE, Style, StyleMode, DecorationCode,
  ForegroundRgbCode, ForegroundSimpleCode,
  BackgroundRgbCode, BackgroundSimpleCode,
  stoyleGlobal, stoyle, styleToAnsiCode,
} from '../mod.ts';
import { assertFailsWith } from './assertFailsWith.ts';

const { Bold, Italic } = DecorationCode;
const { FG_Cyan, FG_Blue, FG_Red } = ForegroundSimpleCode;
const { BG_Red, BG_Yellow, BG_Magenta } = BackgroundSimpleCode;

const p = 'styledOrNot'; // Don't judge me, it's shorter and we don't care about the value anywhere
const empty = '';

const resetDecorationString: string = styleToAnsiCode({ decoration: RESET_CODE });

const italic: Style = { decoration: Italic };
const italicString: string = styleToAnsiCode(italic);
const resetItalicString: string = styleToAnsiCode(italic, true);

const bold: Style = { decoration: Bold };
const resetBoldString: string = styleToAnsiCode(bold, true);

const boldRed: Style = { color: FG_Red, decoration: Bold };
const boldRedString: string = styleToAnsiCode(boldRed);
const resetBoldRedString: string = styleToAnsiCode(boldRed, true);

const cyan: Style = { color: FG_Cyan };
const cyanString: string = styleToAnsiCode(cyan);
const resetCyanString: string = styleToAnsiCode(cyan, true);

const red: Style = { color: FG_Red };
const redString: string = styleToAnsiCode(red);

const boldBlueOnRed: Style = {
  color: FG_Blue,
  backgroundColor: BG_Red,
  decoration: Bold,
};

const bgMagenta: Style = { backgroundColor: BG_Magenta };
const bgMagentaString: string = styleToAnsiCode(bgMagenta);

const rgbColors: Style = {
  color: new ForegroundRgbCode(40, 177, 100),
  backgroundColor: new BackgroundRgbCode(100, 40, 177),
};

Deno.test('should generate codes', () => {
  assertEquals(styleToAnsiCode(boldBlueOnRed), '\x1b[34;41;1m');
  assertEquals(styleToAnsiCode(rgbColors), '\x1b[38;2;40;177;100;48;2;100;40;177m');
});

Deno.test('should fail on invalid RGB code', () => {
  assertFailsWith(
    () => new ForegroundRgbCode(1000, -1, 12),
    'Should have failed, the RGB numbers are moot',
    'RGB codes should be between 0 & 255, got: 1000',
  );
});

Deno.test('should style one element', () => {
  const output = stoyle`I am in ${p}!`({ nodes: [ cyan ] }, StyleMode.STYLE);
  assertEquals(output, `I am in ${cyanString}${p}${resetDecorationString}!`);
});

Deno.test('should style whole string', () => {
  const output = stoyleGlobal`Je s'appelle Groot!`(cyan, StyleMode.STYLE);
  assertEquals(output, `${cyanString}Je s'appelle Groot!${resetDecorationString}`);
});

Deno.test('should not style when style is empty', () => {
  const output = stoyle`I am ${p}!`({ nodes: [ {} ] }, StyleMode.STYLE);
  assertEquals(output, `I am ${p}!`);
});

Deno.test('should not style in no color mode', () => {
  const output = stoyle`I am ${p}!`({ nodes: [ cyan ] }, StyleMode.NO_STYLE);
  assertEquals(output, `I am ${p}!`);
});

Deno.test('should not global style in no color mode', () => {
  const output = stoyleGlobal`I am ${p}!`(cyan, StyleMode.NO_STYLE);
  assertEquals(output, `I am ${p}!`);
});

Deno.test('should not style empty value', () => {
  const output = stoyle`I am ${empty}!`({ nodes: [ cyan ] }, StyleMode.STYLE);
  assertEquals(output, `I am ${empty}!`);
});

Deno.test('should style by default', () => {
  const output = stoyle`I am ${p}!`({ nodes: [ cyan ] });
  assertEquals(output, `I am ${cyanString}${p}${resetDecorationString}!`);
});

Deno.test('should support nesting template literals', () => {
  const output = stoyle`I am ${`<${p}>`}!`({ nodes: [ cyan ] }, StyleMode.STYLE);
  assertEquals(output, `I am ${cyanString}<${p}>${resetDecorationString}!`);
});

Deno.test('should style numbers', () => {
  const number = 1;
  const output = stoyle`I am ${String(number)}!`({ nodes: [ cyan ] }, StyleMode.STYLE);
  assertEquals(output, `I am ${cyanString}${number}${resetDecorationString}!`);
});

Deno.test('should fail if parameters and styles lengths are not equal for nodes', () => {
  assertFailsWith(
    () => stoyle`${p}`({ nodes: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too few values',
    'I found 1 node(s), but 2 node style(s)!',
  );

  assertFailsWith(
    () => stoyle`${p}${p}${p}`({ nodes: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too many values',
    'I found 3 node(s), but 2 node style(s)!',
  );

  assertFailsWith(
    () => stoyle`A string`({ nodes: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too many values',
    'I found 0 node(s), but 2 node style(s)!',
  );
});

Deno.test('should fail if parameters and styles lengths are not equal for edges', () => {
  assertFailsWith(
    () => stoyle`whatever`({ edges: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too few values',
    'I found 1 edge(s), but 2 edge style(s)!',
  );

  assertFailsWith(
    () => stoyle`wat${p}wot${p}wut`({ edges: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too many values',
    'I found 3 edge(s), but 2 edge style(s)!',
  );
});

Deno.test('should expect edge styles for empty leading/trailing edges', () => {
  stoyle`${p}wat`({ edges: [ {}, cyan ] }, StyleMode.STYLE);
  stoyle`wat${p}`({ edges: [ cyan, {} ] }, StyleMode.STYLE);
});

Deno.test('should style complex strings', () => {
  assertEquals(
    stoyle`Italic ${'boldRed'} bold ${'default'} italic`(
      {
        global: italic,
        edges: [ undefined, bold, undefined ],
        nodes: [ boldRed, {} ],
      },
    ),
    [
      `${italicString}Italic `,
      `${resetBoldRedString}boldRed`,
      `${resetBoldString} bold `,
      `${resetDecorationString}default`,
      `${italicString} italic${resetDecorationString}`,
    ].join(''),
  );

  assertEquals(
    stoyle`${p}toto${p}`(
      {
        global: italic,
        nodes: [ boldRed, cyan ],
      },
    ),
    `${boldRedString}${p}${resetItalicString}toto${resetCyanString}${p}${resetDecorationString}`,
  );
});

Deno.test('should use minimal codes', () => {
  assertEquals(stoyle`${p}`({ nodes: [ cyan ] }), `${cyanString}${p}${resetDecorationString}`);
  assertEquals(stoyle`${p}`({ nodes: [ bgMagenta ] }), `${bgMagentaString}${p}${resetDecorationString}`);
  assertEquals(stoyle`${p}toto`({ nodes: [ cyan ] }), `${cyanString}${p}${resetDecorationString}toto`);
  assertEquals(stoyle`${p}${p}`({ nodes: [ cyan, {} ] }), `${cyanString}${p}${resetDecorationString}${p}`);
  assertEquals(stoyle`${p}${p}`({ nodes: [ cyan, cyan ] }), `${cyanString}${p}${p}${resetDecorationString}`);
  assertEquals(stoyle`${p}${p}`({ nodes: [ cyan, red ] }), `${cyanString}${p}${redString}${p}${resetDecorationString}`);
  assertEquals(stoyle`${p}${p}`({ nodes: [ bgMagenta, {} ] }), `${bgMagentaString}${p}${resetDecorationString}${p}`);
  assertEquals(stoyle`${p}test${p}`({ nodes: [ cyan, red ] }), `${cyanString}${p}${resetDecorationString}test${redString}${p}${resetDecorationString}`);
});
