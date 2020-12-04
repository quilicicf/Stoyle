/* eslint-disable no-control-regex */
// Comes from https://github.com/doowb/ansi-colors (MIT License)
// Made it match exactly since I'm looking for only an ANSI code
const ANSI_REGEX = /^[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))$/;

// Would be better done with runtypes or io-ts but none were ported to Deno yet.
export type Template = { [ key: string ]: string };

export function loadTemplate (reference: Template, template: Template): Template {
  const errors = [
    ...Object.entries(template)
      .map(([ key, code ]) => [
        ...(reference[ key ] ? [] : [ `unknown key: ${key}` ]),
        ...(ANSI_REGEX.test(code) ? [] : [ `invalid ANSI code: ${code}` ]),
      ])
      .flat(),
    ...Object.keys(reference)
      .map((key) => (template[ key ] ? false : `missing key: ${key}`))
      .filter(Boolean),
  ];

  if (errors.length) {
    throw new Error(`[Style template errors]\n* ${errors.join('\n* ')}`);
  }

  return template;
}
