# ColorMee

ANSI styling for Deno

## Usage

```js
// TODO: the link may need to be changed.
import {
  BackgroundCode, ForegroundCode, StyleCode,
  parse, createStyle, applyStyle, StyleMode,
} from 'https://raw.githubusercontent.com/quilicicf/ColorMee/master/index.ts';

const boldCyanOnRed = createStyle({
  foreground: ForegroundCode.Cyan,
  background: BackgroundCode.Red,
  style: StyleCode.Bold,
});

const parameter = 'this';
console.log(applyStyle(parse`I'm styling ${boldCyanOnRed}!`, [ boldCyanOnRed ]));
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

console.log(applyStyle(parse`${commit.sha} ${`<${commit.author}>`}`, [ red, boldBlue ], styleMode));
```

Also, the aim is to allow theming.

## For what usage

I wrote this lib to have a lib that would allow theming for a CLI tool.

The idea is to support theming and batch-mode (understand a `--no-color` mode).

## Philosophy

The goal is to follow the philosophy below:

* small: <!-- SUBSTITUTE-START: bundledSize -->`7.0 Kb`<!-- SUBSTITUTE-END --> bundled, <!-- SUBSTITUTE-START: minifiedSize -->`3.6 Kb`<!-- SUBSTITUTE-END --> minified
* IDE-integrated: uses real template literals!
* simple: straight-forward API, I don't handle the parsing!
* maintainable: the whole algorithm is 40 lines long and annotated
* efficient: the algorithm uses the smallest possible amount of ANSI codes
* fail fast and hard: the lib throws ASAP if it finds an error

My only regret: the template string mechanism can't statically check for errors, but I find that the price to pay is pretty small compared to the gains.
