<!-- Formatted by https://github.com/quilicicf/markdown-formatter -->

# Stoyle

> ANSI styling for Deno/NodeJS

![A classy british bull working on a painting that represents colorized code](./docs/stoyle.webp)

<!-- TOC START -->

* [Usage](#usage)
* [Why](#why)
* [For what usage](#for-what-usage)
* [Modules](#modules)
* [Philosophy](#philosophy)

<!-- TOC END -->

## Usage

<!-- 🔁: basicExample -->

```js
import {
  Style,
  BackgroundSimpleCode, ForegroundSimpleCode, DecorationCode,
  stoyle, stoyleGlobal,
} from '../mod.ts';

const boldCyanOnRed: Style = {
  color: ForegroundSimpleCode.FG_Cyan,
  backgroundColor: BackgroundSimpleCode.BG_Red,
  decoration: DecorationCode.Bold,
};

const bold: Style = { decoration: DecorationCode.Bold };
const italic: Style = { decoration: DecorationCode.Italic };

// Styling parameters of a string
const parameter = 'this';
console.log(stoyle`I'm styling ${parameter}, but not ${parameter} or ${parameter}.`(
  {
    nodes: [ // The nodes are the template string's dynamic parts
      boldCyanOnRed,
      undefined, /* Undefined style => no style */
      {}, /* Empty styles work the same as no style */
    ],
  },
));

// Styling a whole string
const otherParameter = 'EVERYTHING';
console.log(
  stoyleGlobal`I'm styling ${otherParameter}`(boldCyanOnRed), // The style is for the whole string with stoyleGlobal
);

// Full example
console.log(stoyle`I'm styling ${parameter}, but not ${parameter} or ${parameter}.`(
  {
    global: italic, // The global style is for the whole string, it's overwritten by edges/nodes styles
    edges: [ // The edges are the template string's static parts
      undefined, bold, undefined, undefined,
    ],
    nodes: [ // The nodes are the template string's dynamic parts
      boldCyanOnRed,
      undefined, // Undefined style means no style, which means global style is applied
      {}, // Empty styles reset all styles, the global style is not applied
    ],
  },
));

```

<!-- 🔁 -->

## Why

I was tired of reading the common pattern that has the following drawbacks:

* mixes style and content
* usually does not support batch mode (no-color/style)
* dilutes the CLI tool's color scheme everywhere in the code

```js
import { red, bold, blue } from 'anyLib';

console.log(`${red(commit.sha)} ${bold(blue(`<${commit.owner}>`))}`);
```

Compare to the following:

```js
import { stoyle } from 'stoyle'; // dummy location, of course
import { theme } from './theme.ts';

const { commit: { shaStyle, authorStyle } } = theme;
const styleMode = computeStyleModeFromCliArgOrWhatever(); // Allows no-color mode

console.log(
  stoyle`${commit.sha} ${`<${commit.author}>`}`(
    { nodes: [ shaStyle, authorStyle ] },
    styleMode,
  )
);
```

More verbose, but much cleaner too!

## For what usage

I wrote this lib to help me write CLI tools with a theme that would be:

* centralized
* consistent
* swap-able
* de-activated easily (batch/CI mode)

## Modules

* `mod.ts` apply styles on a template literal
* `validateTheme.ts` validate a theme against a reference theme. This allows you to create a default theme for your CLI tool and let anyone change it by loading another theme instead, with guarantees that there won't be missing styles

> The only module that is required is `mod.ts`.

## Philosophy

The goal is to follow the philosophy below:

* __IDE-integrated__: uses real template literals!
* __Simple__: straight-forward API, I don't handle the parsing!
* __Maintainable__: the whole algorithm is under a 100 lines long, and annotated
* __Efficient__: the algorithm uses the smallest possible amount of ANSI codes
* __Fail fast and hard__: the lib throws ASAP if it finds an error
* __Small__:

  | Module           | Raw size                                     | Gzipped size                                      | Bundled size                                     | Bundled + gzipped size                                     |
  | ---------------- | -------------------------------------------- | ------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
  | mod.ts           | <!-- 🔁: modRawSize -->`8.5 Kb`<!-- 🔁 -->   | <!-- 🔁: modGzippedSize -->`2.3 Kb`<!-- 🔁 -->    | <!-- 🔁: modBundledSize -->`5.0 Kb`<!-- 🔁 -->  | <!-- 🔁: modBundledAndGzippedSize -->`1.7 Kb`<!-- 🔁 -->   |
  | validateTheme.ts | <!-- 🔁: themeRawSize -->`2.8 Kb`<!-- 🔁 --> | <!-- 🔁: themeGzippedSize -->`786.0 b`<!-- 🔁 --> | <!-- 🔁: themeBundledSize -->`3.4 Kb`<!-- 🔁 --> | <!-- 🔁: themeBundledAndGzippedSize -->`1.1 Kb`<!-- 🔁 --> |

My regrets:

* the template string mechanism can't statically check for errors, but I find that the price to pay is pretty small compared to the gains
* the validation of the theme is a bit clumsy at the moment, I'd like to try using `runtypes` to check that the template conforms to the provided interface but no library of this type has been ported to Deno to my knowledge (although for `runtypes` it seems to be happening)
