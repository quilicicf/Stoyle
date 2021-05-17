import {
  Style,
  BackgroundSimpleCode, ForegroundSimpleCode, DecorationCode,
  parse, style,
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
console.log(style(
  parse`I'm styling ${parameter}, but not ${parameter} or ${parameter}.`,
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
console.log(style(
  `I'm styling ${otherParameter}`, // The string is not parsed
  { global: boldCyanOnRed }, // The global style is for the whole string
));

// Full example
console.log(style(
  parse`I'm styling ${parameter}, but not ${parameter} or ${parameter}.`,
  {
    global: italic, // The global style is for the whole string
    edges: [ // The edges are the template string's static parts
      undefined, bold, undefined, undefined,
    ],
    nodes: [ // The nodes are the template string's dynamic parts
      boldCyanOnRed,
      undefined, /* Undefined style => no style */
      {}, /* Empty styles work the same as no style */
    ],
  },
));
