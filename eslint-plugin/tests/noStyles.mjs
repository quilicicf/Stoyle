import { RuleTester } from 'eslint';
import eslintRule from '../src/stoyle-usage.mjs';
import parserOptions from './lib/parserOptions.mjs';

new RuleTester(parserOptions)
  .run('no-styles', eslintRule, {
    valid: [
      { code: 'stoyle`Kikoo`' },
      { code: 'stoyle`Kikoo`({})' },
    ],
    invalid: [ {
      code: 'stoyle`Kikoo`()',
      errors: [ { messageId: 'noStyles' } ],
    } ],
  });
