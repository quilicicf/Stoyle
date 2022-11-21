import { RuleTester } from 'eslint';
import eslintRule from '../src/stoyle-usage.mjs';

export default function (parsingOptions) {
  new RuleTester(parsingOptions).run('styles-to-apply', eslintRule, {
    valid: [
      { code: 'stoyle`Kikoo`({})' },
      { code: 'stoyleGlobal`Kikoo`({})' },
    ],
    invalid: [
      {
        code: 'stoyle`Kikoo`(null)',
        errors: [ { messageId: 'wrongParameterType' } ],
      },
      {
        code: 'stoyle`Kikoo ${name}`({ edges: [ {}, {}, {} ] })',
        errors: [ { messageId: 'edgesNumberMismatch' } ],
      },
    ],
  });
};
