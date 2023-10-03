import { RuleTester } from 'eslint';
import eslintRule from '../src/stoyle-usage.mjs';
import parserOptions from './lib/parserOptions.mjs';

new RuleTester(parserOptions)
  .run('edges-mismatch', eslintRule, {
    valid: [
      'stoyle`Kikoo`({})',
      'stoyle`Kikoo`({edges: [ {} ] })',
      'stoyle`Kikoo ${name}`({ edges: [ {}, {} ] })',
    ],
    invalid: [
      {
        code: 'stoyle`Kikoo`({ edges: [] })',
        errors: [ { messageId: 'edgesNumberMismatch' } ],
      },
      {
        code: 'stoyle`Kikoo ${name}`({ edges: [ {}, {}, {} ] })',
        errors: [ { messageId: 'edgesNumberMismatch' } ],
      },
    ],
  });
