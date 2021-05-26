import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import {
  Style,
  BackgroundSimpleCode, DecorationCode, ForegroundSimpleCode, ForegroundRgbCode, BackgroundRgbCode,
} from '../mod.ts';
import { validateTheme } from '../validateTheme.ts';
import { assertFailsWith } from './assertFailsWith.ts';

const { FG_Cyan, FG_Red } = ForegroundSimpleCode;
const { BG_Yellow } = BackgroundSimpleCode;
const { Bold } = DecorationCode;

const red: Style = { color: FG_Red };
const cyan: Style = { color: FG_Cyan };
const bgYellow: Style = { backgroundColor: BG_Yellow };
const bold: Style = { decoration: Bold };

const rgbColors: Style = {
  color: new ForegroundRgbCode(40, 177, 100),
  backgroundColor: new BackgroundRgbCode(100, 40, 177),
};

const referenceTheme = {
  strong: bold,
  emphasis: cyan,
  warn: bgYellow,
};

const nestedReferenceTheme = {
  validation: {
    strong: bold,
    emphasis: cyan,
    warn: bgYellow,
  },
};

Deno.test('should load correct theme', () => {
  const theme = { strong: red, emphasis: bold, warn: bgYellow };
  const validTheme = validateTheme(referenceTheme, theme);
  assertEquals(theme, validTheme);
});

Deno.test('should load theme with non-blocking edge cases', () => {
  const alternateReferenceTheme = { ...referenceTheme, null: null, string: 'string' };
  const theme = { strong: red, emphasis: bold, warn: rgbColors, notInReference: rgbColors };
  const validTheme = validateTheme(alternateReferenceTheme, theme);
  assertEquals(theme, validTheme);
});

Deno.test('should fail on invalid styles', () => {
  const invalidStyle1 = 'toto';
  const invalidStyle2 = { color: 16874351987 };
  const invalidStyle3 = { backgroundColor: 16874351987 };
  const invalidStyle4 = null;
  const theme = {
    strong: invalidStyle1,
    emphasis: invalidStyle2,
    warn: invalidStyle3,
    whateva: invalidStyle4,
  };

  const alternateReferenceTheme = {
    ...referenceTheme,
    whateva: cyan,
  };

  assertFailsWith(
    () => validateTheme(alternateReferenceTheme, theme),
    'Should have failed, invalid style',
    [
      '[Theme errors]',
      '* The theme should contain a style at ["strong"]',
      '* The theme color is invalid at ["emphasis"]. It should be a ForegroundSimpleCode or ForegroundRgbCode',
      '* The theme backgroundColor is invalid at ["warn"]. It should be a BackgroundSimpleCode or BackgroundRgbCode',
      '* The theme should contain a style at ["whateva"]',
    ].join('\n'),
  );
});

Deno.test('should fail on invalid nested styles', () => {
  const invalidStyle1 = new Date();
  const invalidStyle2 = 123;
  const invalidStyle3 = { decoration: 16874351987 };
  const theme = {
    validation: {
      strong: invalidStyle1, emphasis: invalidStyle2, warn: invalidStyle3,
    },
  };

  assertFailsWith(
    () => validateTheme(nestedReferenceTheme, theme),
    'Should have failed, invalid style',
    [
      '[Theme errors]',
      '* The theme should contain a style at ["validation","emphasis"]',
      '* The theme decoration is invalid at ["validation","warn"]. It should be a DecorationCode',
    ].join('\n'),
  );
});

Deno.test('should fail on null nested style', () => {
  const theme = { validation: null };

  assertFailsWith(
    () => validateTheme(nestedReferenceTheme, theme),
    'Should have failed, invalid style',
    [
      '[Theme errors]',
      '* The theme should contain an object at ["validation"]',
    ].join('\n'),
  );
});

Deno.test('should fail on non-object nested style', () => {
  const theme = { validation: 'wat?' };

  assertFailsWith(
    () => validateTheme(nestedReferenceTheme, theme),
    'Should have failed, invalid style',
    [
      '[Theme errors]',
      '* The theme should contain an object at ["validation"]',
    ].join('\n'),
  );
});
