module.exports = {
  entry: {
    mod: __dirname + '/mod.ts',
    validateTheme: __dirname + '/validateTheme.ts',
  },
  output: {
    path: __dirname + '/dist',
  },
  mode: 'production',
  target: 'node',
};
