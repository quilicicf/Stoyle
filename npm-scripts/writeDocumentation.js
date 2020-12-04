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
  const getStartMark = (key) => `<!-- SUBSTITUTE-START: ${key} -->`;
  const endMark = `<!-- SUBSTITUTE-END -->`;
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

const main = async () => {
  const denoPath = process.argv.splice(2)[ 0 ];
  const rootDirectory = resolvePath(__dirname, '..');

  const sourceFile = resolvePath(rootDirectory, 'index.ts');
  const bundled = execSync(`${denoPath || 'deno'} bundle ${sourceFile}`, { encoding: 'utf8' });

  const { code: minified, error } = minify(bundled, {});

  if (error) { throw Error(error); }

  const bundledSize = codeSize(bundled);
  const minifiedSize = codeSize(minified);

  const readmeFile = resolvePath(rootDirectory, 'README.md');
  const readme = readFileSync(readmeFile, 'utf8');
  const updatedReadme = substituteInReadme(readme, { bundledSize, minifiedSize });
  console.log(updatedReadme);
  writeFileSync(readmeFile, updatedReadme, 'utf8');
};

main();
