import { RuleTester } from 'eslint';
import eslintRule from '../src/stoyle-usage.mjs';
import parserOptions from './lib/parserOptions.mjs';

new RuleTester(parserOptions)
  .run('wrong-parameter-type', eslintRule, {
    valid: [
      //   'stoyle`Kikoo`({})',
      //   'stoyle`Kikoo ${name}`({ nodes: [ undefined ] })',
      //   'stoyleGlobal`Kikoo`({})',
      //   'stoyleGlobal`Kikoo`(undefined)',
    ],
    invalid: [
      // {
      //   code: 'stoyle`Kikoo ${name}`(\'Oopsie\')',
      //   errors: [ { messageId: 'shouldBeObject' } ],
      // },
      {
        code: 'stoyle`Kikoo ${name}`({ nodes: 123 })',
        errors: [ { messageId: 'shouldBeArray' } ],
      },
      // {
      //   code: 'stoyle`Kikoo ${name}`({ nodes: [ 123 ] })',
      //   errors: [ { messageId: 'shouldBeObjectOrUndefined' } ],
      // },
      // {
      //   code: 'stoyleGlobal`Kikoo ${name}`(\'Oopsie\')',
      //   errors: [ { messageId: 'wrongStoyleGlobalParameterType' } ],
      // },
    ],
  });
