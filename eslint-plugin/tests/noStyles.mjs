import { RuleTester } from 'eslint';
import eslintRule from '../src/stoyle-usage.mjs';

export default function (parsingOptions) {
  new RuleTester(parsingOptions).run('no-styles', eslintRule, {
    valid: [
      { code: 'stoyle`Kikoo`' },
      { code: 'stoyle`Kikoo`({})' },
    ],
    invalid: [ {
      code: 'stoyle`Kikoo`()',
      errors: [ { messageId: 'noStyles' } ],
    } ],
  });
};
