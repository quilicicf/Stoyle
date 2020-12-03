import { assertEquals, fail } from 'https://deno.land/std/testing/asserts.ts';

import {
  BackgroundCode, BackgroundRgbCode,
  ForegroundCode, ForegroundRgbCode,
  StyleCode,
  createStyle, applyStyle,
  StyleMode, RESET_CODE,
} from './index.ts';

const p = 'styledOrNot'; // Don't judge me, it's shorter and we don't care about the value anywhere
const empty = '';
const cyan = createStyle({ foreground: ForegroundCode.Cyan });
const red = createStyle({ foreground: ForegroundCode.Red });
const boldBlueOnRed = createStyle({
    foreground: ForegroundCode.Blue,
    background: BackgroundCode.Red,
    style: StyleCode.Bold,
  },
);
const rgbColors = createStyle({
  foreground: new ForegroundRgbCode(40, 177, 100),
  background: new BackgroundRgbCode(100, 40, 177),
});

Deno.test('should generate codes', () => {
  assertEquals(boldBlueOnRed, '\x1b[34;41;1m');
  assertEquals(rgbColors, '\x1b[38;2;40;177;100;48;2;100;40;177m');
});

Deno.test('should style one element', () => {
  function color (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ cyan ], StyleMode.STYLE, strings, ...values);
  }

  const output = color`I am in ${p}!`;
  assertEquals(output, `I am in \x1b[36m${p}\x1b[0m!`);
});

Deno.test('should not style when style is null', () => {
  function color (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ null ], StyleMode.STYLE, strings, ...values);
  }

  const output = color`I am ${p}!`;
  assertEquals(output, `I am ${p}!`);
});

Deno.test('should not style in no color mode', () => {
  function color (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ cyan ], StyleMode.NO_STYLE, strings, ...values);
  }

  const output = color`I am ${p}!`;
  assertEquals(output, `I am ${p}!`);
});

Deno.test('should not style empty value', () => {
  function color (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ cyan ], StyleMode.STYLE, strings, ...values);
  }

  const output = color`I am ${empty}!`;
  assertEquals(output, `I am ${empty}!`);
});

Deno.test('should support nesting template literals', () => {
  function color (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ cyan ], StyleMode.STYLE, strings, ...values);
  }

  assertEquals(color`I am ${`<${p}>`}!`, `I am ${cyan}${`<${p}>`}${RESET_CODE}!`);
});

Deno.test('should fail if parameters and styles lengths are not equal', () => {
  function cyanCyan (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ cyan, cyan ], StyleMode.STYLE, strings, ...values);
  }

  try {
    cyanCyan`${p}`;
    fail('Should have failed, too few values');
  } catch (error) {
    assertEquals(error.message, 'There are 2 styles but 1 values!');
  }

  try {
    cyanCyan`${p}${p}${p}`;
    fail('Should have failed, too many values');
  } catch (error) {
    assertEquals(error.message, 'There are 2 styles but 3 values!');
  }
});

Deno.test('should use minimal codes', () => {
  function onlyCyan (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ cyan ], StyleMode.STYLE, strings, ...values);
  }

  function cyanNull (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ cyan, null ], StyleMode.STYLE, strings, ...values);
  }

  function cyanCyan (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ cyan, cyan ], StyleMode.STYLE, strings, ...values);
  }

  function cyanRed (strings: TemplateStringsArray, ...values: string[]) {
    return applyStyle([ cyan, red ], StyleMode.STYLE, strings, ...values);
  }

  assertEquals(onlyCyan`${p}`, `${cyan}${p}${RESET_CODE}`);
  assertEquals(onlyCyan`${p}toto`, `${cyan}${p}${RESET_CODE}toto`);
  assertEquals(cyanNull`${p}${p}`, `${cyan}${p}${RESET_CODE}${p}`);
  assertEquals(cyanCyan`${p}${p}`, `${cyan}${p}${p}${RESET_CODE}`);
  assertEquals(cyanRed`${p}${p}`, `${cyan}${p}${red}${p}${RESET_CODE}`);
  assertEquals(cyanRed`${p}test${p}`, `${cyan}${p}${RESET_CODE}test${red}${p}${RESET_CODE}`);
});
