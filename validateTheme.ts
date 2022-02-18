// @ts-ignore: Ignore TS2691
import { BackgroundSimpleCode, ForegroundSimpleCode, DecorationCode } from './mod.ts';

function checkCodeProperty (code: Record<string, any>, propertyName: string): boolean {
  return !!code[ propertyName ] && typeof code[ propertyName ] === 'number';
}

function checkValidCodeOrRgb (color: any, enumValues: any[]): boolean {
  return checkValidCode(color, enumValues)
    || (color.red && color.green && color.blue);
}

function checkValidCode (color: any, enumValues: any[]): boolean {
  return enumValues.includes(color);
}

function recursiveValidateTheme (referenceTheme: Record<string, any>, theme: Record<string, any>, location: string[], errors: string[]): string[] {
  Object.entries(referenceTheme)
    .forEach(([ key, referenceCode ]) => {
      if (!referenceCode) { return; }
      if (typeof referenceCode !== 'object') { return; }

      const themeCode = theme[ key ];
      const childLocation = [ ...location, key ];
      if (!checkCodeProperty(referenceCode, 'color')
        && !checkCodeProperty(referenceCode, 'backgroundColor')
        && !checkCodeProperty(referenceCode, 'decoration')) {
        if (!themeCode || typeof themeCode !== 'object') {
          errors.push(`The theme should contain an object at ${JSON.stringify(childLocation)}`);
          return;
        }

        recursiveValidateTheme(referenceCode, themeCode, childLocation, errors);
        return;
      }

      if (!themeCode || typeof themeCode !== 'object') {
        errors.push(`The theme should contain a style at ${JSON.stringify(childLocation)}`);
        return;
      }

      const themeColor = themeCode.color;
      if (themeColor && !checkValidCodeOrRgb(themeColor, Object.values(ForegroundSimpleCode))) {
        errors.push(`The theme color is invalid at ${JSON.stringify(childLocation)}. It should be a ForegroundSimpleCode or ForegroundRgbCode`);
      }

      const themeBackgroundColor = themeCode.backgroundColor;
      if (themeBackgroundColor && !checkValidCodeOrRgb(themeBackgroundColor, Object.values(BackgroundSimpleCode))) {
        errors.push(`The theme backgroundColor is invalid at ${JSON.stringify(childLocation)}. It should be a BackgroundSimpleCode or BackgroundRgbCode`);
      }

      const themeDecoration = themeCode.decoration;
      if (themeDecoration && !checkValidCode(themeDecoration, Object.values(DecorationCode))) {
        errors.push(`The theme decoration is invalid at ${JSON.stringify(childLocation)}. It should be a DecorationCode`);
      }
    });

  return errors;
}

export function validateTheme (referenceTheme: Record<string, any>, theme: Record<string, any>): Record<string, any> {
  const errors = recursiveValidateTheme(referenceTheme, theme, [], []);

  if (errors.length) {
    throw new Error(`[Theme errors]\n* ${errors.join('\n* ')}`);
  }

  return theme;
}
