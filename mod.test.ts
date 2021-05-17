import { assertEquals, fail } from 'https://deno.land/std/testing/asserts.ts';


import { BackgroundRgbCode, BackgroundSimpleCode, DecorationCode, ForegroundRgbCode, ForegroundSimpleCode, parse, Style, style, StyleMode, styleToAnsiCode } from './mod.ts';
import { validateTemplate } from './validateTemplate.ts';

const {
  FG_Cyan, FG_Blue, FG_Red, FG_Default,
} = ForegroundSimpleCode;
const { Default, Bold, Italic } = DecorationCode;
const { BG_Red, BG_Yellow } = BackgroundSimpleCode;

const p = 'styledOrNot'; // Don't judge me, it's shorter and we don't care about the value anywhere
const empty = '';

const resetDecorationString: string = styleToAnsiCode({ decoration: Default });

const italic: Style = { decoration: Italic };
const italicString: string = styleToAnsiCode(italic);

const bold: Style = { decoration: Bold };

const boldRed: Style = { color: FG_Red, decoration: Bold };
const boldRedString: string = styleToAnsiCode(boldRed);

const resetColor: Style = { color: FG_Default };
const resetColorString: string = styleToAnsiCode(resetColor);

const cyan: Style = { color: FG_Cyan };
const cyanString: string = styleToAnsiCode(cyan);

const red: Style = { color: FG_Red };
const redString: string = styleToAnsiCode(red);

const bgYellow: Style = { backgroundColor: BG_Yellow };

const boldBlueOnRed: Style = {
  color: FG_Blue,
  backgroundColor: BG_Red,
  decoration: Bold,
};

const rgbColors: Style = {
  color: new ForegroundRgbCode(40, 177, 100),
  backgroundColor: new BackgroundRgbCode(100, 40, 177),
};

const referenceTemplate = {
  strong: bold,
  emphasis: cyan,
  warn: bgYellow,
};

const nestedReferenceTemplate = {
  validation: {
    strong: bold,
    emphasis: cyan,
    warn: bgYellow,
  },
};

const assertFailsWith = (command: () => any, tryMessage: string, catchMessage: string) => {
  try {
    command();
    fail(tryMessage);
  } catch (error) {
    assertEquals(error.message, catchMessage);
  }
};

Deno.test('should parse template string', () => {
  const { edges, nodes } = parse`a template ${p} string`;
  assertEquals(edges, [ 'a template ', ' string' ]);
  assertEquals(nodes, [ p ]);
});

Deno.test('should generate codes', () => {
  assertEquals(styleToAnsiCode(boldBlueOnRed), '\x1b[34;41;1m');
  assertEquals(styleToAnsiCode(rgbColors), '\x1b[38;2;40;177;100;48;2;100;40;177m');
});

Deno.test('should style one element', () => {
  const output = style(
    parse`I am in ${p}!`,
    { nodes: [ cyan ] },
    StyleMode.STYLE,
  );
  assertEquals(output, `I am in ${cyanString}${p}${resetColorString}!`);
});

Deno.test('should style whole string', () => {
  const input = 'Je s\'appelle Groot!';
  const output = style(
    input,
    { global: cyan },
    StyleMode.STYLE,
  );
  assertEquals(output, `${cyanString}${input}${resetColorString}`);
});

Deno.test('should not style when style is empty', () => {
  const output = style(
    parse`I am ${p}!`,
    { nodes: [ {} ] },
    StyleMode.STYLE,
  );
  assertEquals(output, `I am ${p}!`);
});

Deno.test('should not style in no color mode', () => {
  const output = style(
    parse`I am ${p}!`,
    { nodes: [ cyan ] },
    StyleMode.NO_STYLE,
  );
  assertEquals(output, `I am ${p}!`);
});

Deno.test('should not style empty value', () => {
  const output = style(
    parse`I am ${empty}!`,
    { nodes: [ cyan ] },
    StyleMode.STYLE,
  );
  assertEquals(output, `I am ${empty}!`);
});

Deno.test('should style by default', () => {
  const output = style(
    parse`I am ${p}!`,
    { nodes: [ cyan ] },
  );
  assertEquals(output, `I am ${cyanString}${p}${resetColorString}!`);
});

Deno.test('should support nesting template literals', () => {
  const output = style(
    parse`I am ${`<${p}>`}!`,
    { nodes: [ cyan ] },
    StyleMode.STYLE,
  );
  assertEquals(output, `I am ${cyanString}${`<${p}>`}${resetColorString}!`);
});

Deno.test('should style numbers', () => {
  const number = 1;
  const output = style(
    parse`I am ${String(number)}!`,
    { nodes: [ cyan ] },
    StyleMode.STYLE,
  );
  assertEquals(output, `I am ${cyanString}${number}${resetColorString}!`);
});

Deno.test('should fail if parameters and styles lengths are not equal for nodes', () => {
  assertFailsWith(
    () => style(parse`${p}`, { nodes: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too few values',
    'I found 1 node(s), but 2 node style(s)!',
  );

  assertFailsWith(
    () => style(parse`${p}${p}${p}`, { nodes: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too many values',
    'I found 3 node(s), but 2 node style(s)!',
  );

  assertFailsWith(
    () => style('A string', { nodes: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too many values',
    'I found 0 node(s), but 2 node style(s)!',
  );
});

Deno.test('should fail if parameters and styles lengths are not equal for edges', () => {
  assertFailsWith(
    () => style('whatever', { edges: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too few values',
    'I found 1 edge(s), but 2 edge style(s)!',
  );

  assertFailsWith(
    () => style(parse`wat${p}wot${p}wut`, { edges: [ cyan, cyan ] }, StyleMode.STYLE),
    'Should have failed, too many values',
    'I found 3 edge(s), but 2 edge style(s)!',
  );
});

Deno.test('should not expect edge styles for empty leading/trailing edges', () => {
  style(parse`${p}wat`, { edges: [ cyan ] }, StyleMode.STYLE);
  style(parse`wat${p}`, { edges: [ cyan ] }, StyleMode.STYLE);
});

Deno.test('should use minimal codes', () => {
  assertEquals(style(parse`${p}`, { nodes: [ cyan ] }), `${cyanString}${p}${resetColorString}`);
  assertEquals(style(parse`${p}toto`, { nodes: [ cyan ] }), `${cyanString}${p}${resetColorString}toto`);
  assertEquals(style(parse`${p}${p}`, { nodes: [ cyan, {} ] }), `${cyanString}${p}${resetColorString}${p}`);
  assertEquals(style(parse`${p}${p}`, { nodes: [ cyan, cyan ] }), `${cyanString}${p}${p}${resetColorString}`);
  assertEquals(style(parse`${p}${p}`, { nodes: [ cyan, red ] }), `${cyanString}${p}${redString}${p}${resetColorString}`);
  assertEquals(style(parse`${p}test${p}`, { nodes: [ cyan, red ] }), `${cyanString}${p}${resetColorString}test${redString}${p}${resetColorString}`);
  assertEquals(
    style(
      parse`Italic ${'boldRed'} bold ${'default'} italic`,
      {
        global: italic,
        edges: [ undefined, bold, undefined ],
        nodes: [ boldRed, {} ],
      },
    ),
    [
      `${italicString}Italic `,
      `${resetDecorationString}${boldRedString}boldRed`,
      `${resetColorString} bold `,
      `${resetDecorationString}default`,
      `${italicString} italic${resetDecorationString}`,
    ].join(''),
  );
});

Deno.test('should load correct template', () => {
  const template = { strong: red, emphasis: bold, warn: bgYellow };
  const validTemplate = validateTemplate(referenceTemplate, template);
  assertEquals(template, validTemplate);
});

Deno.test('should fail on invalid styles', () => {
  const invalidStyle1 = 'toto';
  const invalidStyle2 = { color: 16874351987 };
  const invalidStyle3 = { backgroundColor: 16874351987 };
  const template = { strong: invalidStyle1, emphasis: invalidStyle2, warn: invalidStyle3 };

  assertFailsWith(
    () => validateTemplate(referenceTemplate, template),
    'Should have failed, invalid style',
    [
      '[Style template errors]',
      '* The template should contain a style at ["strong"]',
      '* The template color is invalid at ["emphasis"]. It should be a ForegroundSimpleCode or ForegroundRgbCode',
      '* The template backgroundColor is invalid at ["warn"]. It should be a BackgroundSimpleCode or BackgroundRgbCode',
    ].join('\n'),
  );
});

Deno.test('should fail on invalid nested styles', () => {
  const invalidStyle1 = new Date();
  const invalidStyle2 = 123;
  const invalidStyle3 = { decoration: 16874351987 };
  const template = {
    validation: {
      strong: invalidStyle1, emphasis: invalidStyle2, warn: invalidStyle3,
    },
  };

  assertFailsWith(
    () => validateTemplate(nestedReferenceTemplate, template),
    'Should have failed, invalid style',
    [
      '[Style template errors]',
      '* The template should contain a style at ["validation","emphasis"]',
      '* The template decoration is invalid at ["validation","warn"]. It should be a DecorationCode',
    ].join('\n'),
  );
});
