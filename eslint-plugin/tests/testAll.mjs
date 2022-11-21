import noStyles from './noStyles.mjs';
import nodesMismatch from './nodesMismatch.mjs';
import edgesMismatch from './edgesMismatch.mjs';

const parsingOptions = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
    ecmaFeatures: {},
  },
};

// noStyles(parsingOptions);
// nodesMismatch(parsingOptions);
edgesMismatch(parsingOptions);
