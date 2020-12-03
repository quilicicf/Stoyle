import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import {
  BackgroundCode, BackgroundRgbCode,
  ForegroundCode, ForegroundRgbCode,
  StyleCode, ColorMode,
  compose, wrap
} from './index.ts';

Deno.test('should generate codes', () => {
  const { colorCode } = compose({ foreground: ForegroundCode.Blue, background: BackgroundCode.Red, style: StyleCode.Bold });
  assertEquals(colorCode, '\x1b[34;41;1m');

  const { colorCode: rgbColorCode } = compose({
    foreground: new ForegroundRgbCode(40, 177, 100),
    background: new BackgroundRgbCode(100, 40, 177)
  });
  assertEquals(rgbColorCode, '\x1b[38;2;40;177;100;48;2;100;40;177m');
});

Deno.test('should return empty string when wrapping no fragments', () => {
  assertEquals(wrap([]), '');
});

Deno.test('should wrap text with colors', () => {
  const cyan = compose({ foreground: ForegroundCode.Cyan });
  const output = wrap([
    { string: 'test', style: cyan },
    { string: ' 1, 2 ' },
    { string: '1, 2', style: cyan }
  ]);
  assertEquals(output, '\x1b[36mtest\x1b[0m 1, 2 \x1b[36m1, 2\x1b[0m');
});

Deno.test('should wrap text without colors in no-color-mode', () => {
  const cyan = compose({ foreground: ForegroundCode.Cyan });
  const output = wrap(
    [
      { string: 'test', style: cyan },
      { string: ' 1, 2 ' },
      { string: '1, 2', style: cyan }
    ],
    ColorMode.NO_COLOR
  );
  assertEquals(output, 'test 1, 2 1, 2');
});

Deno.test('should color once', () => {
  const cyan = compose({ foreground: ForegroundCode.Cyan });
  const output = cyan.colorOnce('Toto');
  assertEquals(output, '\x1b[36mToto\x1b[0m');
});

Deno.test('should use as few color codes as possible', () => {
  const cyan = compose({ foreground: ForegroundCode.Cyan });
  const output = wrap([
    { string: 'Toto', style: cyan },
    { string: '\n' }
  ]);
  assertEquals(output, '\x1b[36mToto\x1b[0m\n');
});
