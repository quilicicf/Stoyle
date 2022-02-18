import { gzip } from 'node-gzip';
import fileSizeJs from 'filesize.js';
import { execSync } from 'child_process';
import { resolve as resolvePath } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const { default: fileSize } = fileSizeJs;

const codeSize = (input) => {
  const bytesNumber = input.length || (new TextEncoder().encode(input)).length;
  return `\`${fileSize(bytesNumber)}\``;
};

const substituteInReadme = (input, values) => {
  const getStartMark = (key) => `<!-- 🔁: ${key} -->`;
  const endMark = `<!-- 🔁 -->`;
  return Object.entries(values)
    .reduce(
      (seed, [ key, value ]) => {
        const startMark = getStartMark(key);
        const regex = new RegExp(`${startMark}.*?${endMark}`, 'gs');
        return seed.replace(regex, `${startMark}${value}${endMark}`);
      },
      input,
    );
};

const getBundledAndMinifiedSizes = async (denoPath, sourceCodePath) => {
  const raw = readFileSync(sourceCodePath, 'utf8');
  const gzipped = await gzip(raw);
  const bundled = execSync(`${denoPath || 'deno'} bundle --no-check ${sourceCodePath}`, { encoding: 'utf8' });

  return {
    rawSize: codeSize(raw),
    gzippedSize: codeSize(gzipped),
    bundledSize: codeSize(bundled),
  };
};

const wrapInCodeFences = (language, code) => `

\`\`\`${language}
${code}
\`\`\`

`;

const main = async () => {
  const denoPath = process.argv.splice(2)[ 0 ];
  const fileName = new URL(import.meta.url).pathname;
  const rootDirectory = resolvePath(fileName, '..', '..');

  const basicExamplePath = resolvePath(rootDirectory, 'examples', 'basic.ts');
  const basicExampleCode = readFileSync(basicExamplePath, 'utf8');
  const wrappedBasicExampleCode = wrapInCodeFences('js', basicExampleCode);

  const {
    rawSize: modRawSize,
    gzippedSize: modGzippedSize,
    bundledSize: modBundledSize,
  } = await getBundledAndMinifiedSizes(denoPath, resolvePath(rootDirectory, 'mod.ts'));

  const {
    rawSize: themerRawSize,
    gzippedSize: themerGzippedSize,
    bundledSize: themerBundledSize,
  } = await getBundledAndMinifiedSizes(denoPath, resolvePath(rootDirectory, 'validateTheme.ts'));

  const readmeFile = resolvePath(rootDirectory, 'README.md');
  const readme = readFileSync(readmeFile, 'utf8');
  const substitutions = {
    basicExample: wrappedBasicExampleCode,
    modRawSize, modGzippedSize, modBundledSize,
    themerRawSize, themerGzippedSize, themerBundledSize,
  };
  const updatedReadme = substituteInReadme(readme, substitutions);
  writeFileSync(readmeFile, updatedReadme, 'utf8');
};

main()
  .catch((error) => process.stderr.write(error.stack));
