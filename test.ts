import { assertEquals, fail } from 'https://deno.land/std/testing/asserts.ts';

import { applyStyle, BackgroundCode, BackgroundRgbCode, createStyle, ForegroundCode, ForegroundRgbCode, parse, RESET_CODE, StyleCode, StyleMode } from './index.ts';

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

Deno.test('should parse template string', () => {
  const { strings, values } = parse`a template ${p} string`;
  assertEquals(strings, [ 'a template ', ' string' ]);
  assertEquals(values, [ p ]);
});

Deno.test('should generate codes', () => {
  assertEquals(boldBlueOnRed, '\x1b[34;41;1m');
  assertEquals(rgbColors, '\x1b[38;2;40;177;100;48;2;100;40;177m');
});

Deno.test('should style one element', () => {
  const output = applyStyle(parse`I am in ${p}!`, [ cyan ], StyleMode.STYLE);
  assertEquals(output, `I am in \x1b[36m${p}\x1b[0m!`);
});

Deno.test('should not style when style is null', () => {
  const output = applyStyle(parse`I am ${p}!`, [ null ], StyleMode.STYLE);
  assertEquals(output, `I am ${p}!`);
});

Deno.test('should not style in no color mode', () => {
  const output = applyStyle(parse`I am ${p}!`, [ cyan ], StyleMode.NO_STYLE);
  assertEquals(output, `I am ${p}!`);
});

Deno.test('should not style empty value', () => {
  const output = applyStyle(parse`I am ${empty}!`, [ cyan ], StyleMode.STYLE);
  assertEquals(output, `I am ${empty}!`);
});

Deno.test('should style by default', () => {
  const output = applyStyle(parse`I am ${p}!`, [ cyan ]);
  assertEquals(output, `I am ${cyan}${p}${RESET_CODE}!`);
});

Deno.test('should support nesting template literals', () => {
  const output = applyStyle(parse`I am ${`<${p}>`}!`, [ cyan ], StyleMode.STYLE);
  assertEquals(output, `I am ${cyan}${`<${p}>`}${RESET_CODE}!`);
});

Deno.test('should fail if parameters and styles lengths are not equal', () => {
  try {
    applyStyle(parse`${p}`, [ cyan, cyan ], StyleMode.STYLE);
    fail('Should have failed, too few values');
  } catch (error) {
    assertEquals(error.message, 'There are 2 styles but 1 values!');
  }

  try {
    applyStyle(parse`${p}${p}${p}`, [ cyan, cyan ], StyleMode.STYLE);
    fail('Should have failed, too many values');
  } catch (error) {
    assertEquals(error.message, 'There are 2 styles but 3 values!');
  }
});

Deno.test('should use minimal codes', () => {
  assertEquals(applyStyle(parse`${p}`, [ cyan ]), `${cyan}${p}${RESET_CODE}`);
  assertEquals(applyStyle(parse`${p}toto`, [ cyan ]), `${cyan}${p}${RESET_CODE}toto`);
  assertEquals(applyStyle(parse`${p}${p}`, [ cyan, null ]), `${cyan}${p}${RESET_CODE}${p}`);
  assertEquals(applyStyle(parse`${p}${p}`, [ cyan, cyan ]), `${cyan}${p}${p}${RESET_CODE}`);
  assertEquals(applyStyle(parse`${p}${p}`, [ cyan, red ]), `${cyan}${p}${red}${p}${RESET_CODE}`);
  assertEquals(applyStyle(parse`${p}test${p}`, [ cyan, red ]), `${cyan}${p}${RESET_CODE}test${red}${p}${RESET_CODE}`);
});
