import { gzip } from 'jsr:@deno-library/compress';
import { resolve } from 'jsr:@std/path';

import fileSizeJs from 'npm:filesize.js';

const { default: fileSize } = fileSizeJs;

interface Sizes {
  rawSize: string;
  gzippedSize: string;
  bundledSize: string;
  bundledAndGzippedSize: string;
}

async function main () {
  const fileName = new URL(import.meta.url).pathname;
  const rootDirectory = resolve(fileName, '..', '..');
  const ignoredDirectory = resolve(rootDirectory, 'ignored');

  const basicExamplePath = resolve(rootDirectory, 'examples', 'basic.ts');
  const basicExampleCode = Deno.readTextFileSync(basicExamplePath);
  const wrappedBasicExampleCode = wrapInCodeFences('js', basicExampleCode);

  const {
    rawSize: modRawSize,
    gzippedSize: modGzippedSize,
    bundledSize: modBundledSize,
    bundledAndGzippedSize: modBundledAndGzippedSize,
  } = await getBundledAndMinifiedSizes(
    resolve(rootDirectory, 'mod.ts'),
    resolve(ignoredDirectory, 'mod.js'),
  );

  const {
    rawSize: themeRawSize,
    gzippedSize: themeGzippedSize,
    bundledSize: themeBundledSize,
    bundledAndGzippedSize: themeBundledAndGzippedSize,
  } = await getBundledAndMinifiedSizes(
    resolve(rootDirectory, 'validateTheme.ts'),
    resolve(ignoredDirectory, 'validateTheme.js'),
  );

  const readmeFile = resolve(rootDirectory, 'README.md');
  const readme = Deno.readTextFileSync(readmeFile);
  const substitutions = {
    basicExample: wrappedBasicExampleCode,
    modRawSize, modGzippedSize, modBundledSize, modBundledAndGzippedSize,
    themeRawSize, themeGzippedSize, themeBundledSize, themeBundledAndGzippedSize,
  };
  const updatedReadme = substituteInReadme(readme, substitutions);
  Deno.writeTextFileSync(readmeFile, updatedReadme);
}

function codeSize (input: string): string {
  const bytesNumber = input.length || (new TextEncoder().encode(input)).length;
  return `\`${fileSize(bytesNumber)}\``;
}

function substituteInReadme (input: string, values: Record<string, string>) {
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
}

async function getBundledAndMinifiedSizes (sourceCodePath: string, outputPath: string): Promise<Sizes> {
  const raw = Deno.readTextFileSync(sourceCodePath);
  const gzipped = new TextDecoder().decode(
    gzip(new TextEncoder().encode(raw)),
  );
  const bundled = Deno.readTextFileSync(outputPath);
  const bundledAndGzipped = new TextDecoder().decode(
    gzip(new TextEncoder().encode(bundled)),
  );

  return {
    rawSize: codeSize(raw),
    gzippedSize: codeSize(gzipped),
    bundledSize: codeSize(bundled),
    bundledAndGzippedSize: codeSize(bundledAndGzipped),
  };
}

function wrapInCodeFences (language, code): string {
  return `

\`\`\`${language}
${code}
\`\`\`

`;
}

main()
  .catch((error) => process.stderr.write(error.stack));
