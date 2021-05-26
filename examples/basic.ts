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
