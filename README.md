# ColorMee

ANSI styling for Deno

<!-- TOC START -->

* [Usage](#usage)
* [Why](#why)
* [For what usage](#for-what-usage)
* [Modules](#modules)
* [Philosophy](#philosophy)

<!-- TOC END -->

## Usage

```js
// TODO: the links may need to be changed.
import {
  BackgroundCode, ForegroundCode, StyleCode, createStyle,
} from 'https://raw.githubusercontent.com/quilicicf/ColorMee/master/createStyle.ts';
import {
  parse, applyStyle, StyleMode,
} from 'https://raw.githubusercontent.com/quilicicf/ColorMee/master/index.ts';

const boldCyanOnRed = createStyle({
  foreground: ForegroundCode.Cyan,
  background: BackgroundCode.Red,
  style: StyleCode.Bold,
});

// Styling parameters of a string
const parameter = 'this';
console.log(applyStyle(
  parse`I'm styling ${parameter}, but not ${parameter}.`,
  [ boldCyanOnRed, null /* Null style => no style */ ],
));

// Styling a whole string
const otherParameter = 'EVERYTHING';
console.log(applyStyle(
  `I'm styling ${otherParameter}`,
  [ boldCyanOnRed ],
));
```

:information_source: You can find more examples in [:link: the tests](./test.ts)

## Why

I was tired of reading the common pattern that mixes style and content and usually does not support batch (no-color/style) mode:

```js
import { red, bold, blue } from 'anyLib';

console.log(`${red(commit.sha)} ${bold(blue(`<${commit.owner}>`))}`);
```

Compare to the following:

```js
import { red, boldBlue } from './graphicalChart.ts'; // Codes are computed using createStyle or just strings
import { parse, applyStyle } from 'ColorMee'; // dummy URL, of course

const styleMode = computeStyleModeFromCliArgOrWhatever(); // Allows no-color mode

console.log(
  applyStyle(parse`${commit.sha} ${`<${commit.author}>`}`, [ red, boldBlue ], styleMode)
);
```

## For what usage

I wrote this lib to have a lib that would allow theming for a CLI tool.

The idea is to support theming and batch-mode (understand a `--no-color` mode).

## Modules

* `index.ts`: apply styles on a template literal
* `createStyle.ts`: create ANSI code with a user-friendly API. This does not need to be included in your code (it's the heaviest module, you might want to watch bundle size) but can be used as a tool to create your templates for example
* `loadTemplate.ts`: load a template and make sure it is consistent with a reference template. This allows you to create a default color scheme for your CLI tool and let anyone theme it by loading another template

> The only module that is required is the `applyStyle` module (in `index.ts`).

## Philosophy

The goal is to follow the philosophy below:

* IDE-integrated: uses real template literals!
* simple: straight-forward API, I don't handle the parsing!
* maintainable: the whole algorithm is 40 lines long and annotated
* efficient: the algorithm uses the smallest possible amount of ANSI codes
* fail fast and hard: the lib throws ASAP if it finds an error
* small:

  | Module             | Bundled size                                          | Minified size                                          |
  | ------------------ | ----------------------------------------------------- | ------------------------------------------------------ |
  | applyStyle (index) | <!-- 🔁: indexBundledSize -->`1.9 Kb`<!-- 🔁 -->      | <!-- 🔁: indexMinifiedSize -->`867.0 b`<!-- 🔁 -->     |
  | createStyle        | <!-- 🔁: creatorBundledSize -->`5.4 Kb`<!-- 🔁 -->    | <!-- 🔁: creatorMinifiedSize -->`2.8 Kb`<!-- 🔁 -->    |
  | loadTemplate       | <!-- 🔁: templatorBundledSize -->`784.0 b`<!-- 🔁 --> | <!-- 🔁: templatorMinifiedSize -->`466.0 b`<!-- 🔁 --> |

My regrets:

* the template string mechanism can't statically check for errors, but I find that the price to pay is pretty small compared to the gains
* the validation of the template is a bit clumsy at the moment, I'd like to try using `runtypes` to check that the template conforms to the provided interface but no library of this type has been ported to Deno to my knowledge (although for `runtypes` it seems to be happening)
