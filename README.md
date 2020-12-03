# ColorMee

ANSI styling for Deno

## Usage

```js
// TODO: the link may need to be changed.
import {
  BackgroundCode, ForegroundCode, StyleCode,
  createStyle, applyStyle, StyleMode,
} from 'https://raw.githubusercontent.com/quilicicf/ColorMee/master/index.ts';

const boldCyanOnRed = createStyle({
  foreground: ForegroundCode.Cyan,
  background: BackgroundCode.Red,
  style: StyleCode.Bold,
});

function color (strings: TemplateStringsArray, ...values: string[]) {
  return applyStyle([ boldCyanOnRed ], StyleMode.STYLE, strings, ...values);
}

const parameter = 'this';
console.log(color`I'm coloring ${parameter} in cyan!`);
```

## Why

I was tired of reading the common pattern that mixes style and content and usually does not support batch (no-color/style) mode:

```js
import { red, bold, blue } from 'anyLib';

console.log(`${red(commit.sha)} ${bold(blue(`<${commit.owner}>`))}`);
```

Compare to the following:

```js
import { red, boldBlue } from './graphicalChart.ts';
import { applyStyle } from 'ColorMee'; // dummy URL, of course

const styleMode = computeStyleModeFromCliArgOrWhatever();

function color (strings: TemplateStringsArray, ...values: string[]) {
  return applyStyle([ red, boldBlue ], styleMode, strings, ...values);
}

console.log(color`${commit.sha} ${`<${commit.author}>`}`);
```

Also, the aim is to allow theming.
