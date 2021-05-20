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

<!-- START-INJECT: examples/basic.ts -->

```js
```

<!-- END-INJECT -->

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
import { stoyle } from 'stoyle'; // dummy URL, of course
import { theme } from './graphicalChart.ts';

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

I wrote this lib to create a theming helper for a CLI tool.

The idea is to support theming and batch-mode (`--no-color` mode).

## Modules

* `mod.ts` apply styles on a template literal
* `validateTheme.ts` validate a theme against a reference theme. This allows you to create a default theme for your CLI tool and let anyone change it by loading another theme instead, with guarantees that there won't be missing styles

> The only module that is required is `mod.ts`.

## Philosophy

The goal is to follow the philosophy below:

* IDE-integrated: uses real template literals!
* simple: straight-forward API, I don't handle the parsing!
* maintainable: the whole algorithm is under a 100 lines long, and annotated
* efficient: the algorithm uses the smallest possible amount of ANSI codes
* fail fast and hard: the lib throws ASAP if it finds an error
* small:

  > Although `deno bundle` currently inflates the bundle quite much

  | Module           | Raw size                                      | Gzipped size                                       | Bundled size                                      |
  | ---------------- | --------------------------------------------- | -------------------------------------------------- | ------------------------------------------------- |
  | mod.ts           | <!-- 🔁: modRawSize -->`8.1 Kb`<!-- 🔁 -->    | <!-- 🔁: modGzippedSize -->`2.4 Kb`<!-- 🔁 -->     | <!-- 🔁: modBundledSize -->`11.6 Kb`<!-- 🔁 -->   |
  | validateTheme.ts | <!-- 🔁: themerRawSize -->`2.8 Kb`<!-- 🔁 --> | <!-- 🔁: themerGzippedSize -->`794.0 b`<!-- 🔁 --> | <!-- 🔁: themerBundledSize -->`8.4 Kb`<!-- 🔁 --> |

My regrets:

* the template string mechanism can't statically check for errors, but I find that the price to pay is pretty small compared to the gains
* the validation of the theme is a bit clumsy at the moment, I'd like to try using `runtypes` to check that the template conforms to the provided interface but no library of this type has been ported to Deno to my knowledge (although for `runtypes` it seems to be happening)
