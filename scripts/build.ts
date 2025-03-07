#!/usr/bin/env deno

import * as esbuild from 'npm:esbuild';
import { denoPlugins } from 'jsr:@luca/esbuild-deno-loader';
import { resolve } from 'jsr:@std/path';

async function main () {
  const fileName = new URL(import.meta.url).pathname;
  const rootDirectory = resolve(fileName, '..', '..');
  const dist2Directory = resolve(rootDirectory, 'dist');
  const modInputFile = resolve(rootDirectory, 'mod.ts');
  const modOutputFile = resolve(dist2Directory, 'mod.js');
  const validateThemeInputFile = resolve(rootDirectory, 'validateTheme.ts');
  const validateThemeOutputFile = resolve(dist2Directory, 'validateTheme.js');

  const homePath = Deno.env.get('HOME');
  const tscLocation = resolve(homePath, '.asdf', 'shims', 'tsc');
  await bundle(modInputFile, modOutputFile, tscLocation);
  await bundle(validateThemeInputFile, validateThemeOutputFile, tscLocation);
}

async function bundle (sourcePath: string, outputPath: string, tscLocation: string): Promise<string> {
  await esbuild.build({
    plugins: [ ...denoPlugins() ],
    entryPoints: [ sourcePath ],
    outfile: outputPath,
    bundle: true,
    format: 'esm',
    sourcemap: 'external',
    minify: true,
  });
  await esbuild.stop();

  await new Deno.Command(
    tscLocation,
    {
      args: [
        '--emitDeclarationOnly',
        '--declaration',
        '--outDir',
        'dist',
        '--lib',
        'esnext',
        sourcePath,
      ],
    },
  ).output();

  return Deno.readTextFileSync(outputPath);
}

main()
  .catch((error) => console.error(`Failed with error: ${error.stack}\n`));


