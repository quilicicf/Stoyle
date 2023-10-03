import { RuleTester } from 'eslint';
import eslintRule from '../src/stoyle-usage.mjs';
import parserOptions from './lib/parserOptions.mjs';

new RuleTester(parserOptions)
  .run('nodes-mismatch', eslintRule, {
    valid: [
      { code: 'stoyle`Kikoo`({})' },
      { code: 'stoyle`Kikoo`({nodes: []})' },
      { code: 'stoyle`Kikoo ${name}`({ nodes: [{}] })' },
      { code: 'stoyle`Kikoo ${name} & ${name2}`({ nodes: [ {}, {} ] })' },
    ],
    invalid: [
      {
        code: 'stoyle`Kikoo`({ nodes: [ {} ] })',
        errors: [ { messageId: 'nodesNumberMismatch' } ],
      },
      {
        code: 'stoyle`Kikoo ${name}`({ nodes: [] })',
        errors: [ { messageId: 'nodesNumberMismatch' } ],
      },
    ],
  });
