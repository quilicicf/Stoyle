import { RuleTester } from 'eslint';
import eslintRule from '../src/stoyle-usage.mjs';

export default function (parsingOptions) {
  new RuleTester(parsingOptions).run('edges-mismatch', eslintRule, {
    valid: [
      { code: 'stoyle`Kikoo`({})' },
      { code: 'stoyle`Kikoo`({edges: [ {} ] })' },
      { code: 'stoyle`Kikoo ${name}`({ edges: [ {}, {} ] })' },
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
};
