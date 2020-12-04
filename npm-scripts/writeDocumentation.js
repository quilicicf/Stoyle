const { minify } = require('uglify-es');
const { default: fileSize } = require('filesize.js');
const { execSync } = require('child_process');
const { resolve: resolvePath } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const codeSize = (string) => {
  const bytesNumber = (new TextEncoder().encode(string)).length;
  return `\`${fileSize(bytesNumber)}\``;
};

const substituteInReadme = (input, values) => {
  const getStartMark = (key) => `<!-- 🔁: ${key} -->`;
  const endMark = `<!-- 🔁 -->`;
  return Object.entries(values)
    .reduce(
      (seed, [ key, value ]) => {
        const startMark = getStartMark(key);
        const regex = new RegExp(`${startMark}.*?${endMark}`, 'g');
        return seed.replace(regex, `${startMark}${value}${endMark}`);
      },
      input,
    );
};

const getBundledAndMinifiedSizes = (denoPath, sourceCodePath) => {
  const bundled = execSync(`${denoPath || 'deno'} bundle ${sourceCodePath}`, { encoding: 'utf8' });
  const { code: minified, error } = minify(bundled, {});
  if (error) { throw Error(error); }

  return {
    bundledSize: codeSize(bundled),
    minifiedSize: codeSize(minified),
  };
};

const main = async () => {
  const denoPath = process.argv.splice(2)[ 0 ];
  const rootDirectory = resolvePath(__dirname, '..');

  const {
    bundledSize: indexBundledSize,
    minifiedSize: indexMinifiedSize,
  } = getBundledAndMinifiedSizes(denoPath, resolvePath(rootDirectory, 'index.ts'));

  const {
    bundledSize: creatorBundledSize,
    minifiedSize: creatorMinifiedSize,
  } = getBundledAndMinifiedSizes(denoPath, resolvePath(rootDirectory, 'createStyle.ts'));

  const {
    bundledSize: templatorBundledSize,
    minifiedSize: templatorMinifiedSize,
  } = getBundledAndMinifiedSizes(denoPath, resolvePath(rootDirectory, 'loadTemplate.ts'));

  const readmeFile = resolvePath(rootDirectory, 'README.md');
  const readme = readFileSync(readmeFile, 'utf8');
  const substitutions = {
    indexBundledSize, indexMinifiedSize,
    creatorBundledSize, creatorMinifiedSize,
    templatorBundledSize, templatorMinifiedSize,
  };
  const updatedReadme = substituteInReadme(readme, substitutions);
  writeFileSync(readmeFile, updatedReadme, 'utf8');
};

main();
