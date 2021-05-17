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

function recursiveValidateTemplate (reference: Record<string, any>, template: Record<string, any>, location: string[], errors: string[]): string[] {
  Object.entries(reference)
    .forEach(([ key, referenceCode ]) => {
      if (!referenceCode) { return; }
      if (typeof referenceCode !== 'object') { return; }

      const templateCode = template[ key ];
      const childLocation = [ ...location, key ];
      if (!checkCodeProperty(referenceCode, 'color')
        && !checkCodeProperty(referenceCode, 'backgroundColor')
        && !checkCodeProperty(referenceCode, 'decoration')) {
        if (!templateCode || typeof templateCode !== 'object') {
          errors.push(`The template should contain an object at ${JSON.stringify(childLocation)}`);
          return;
        }

        recursiveValidateTemplate(referenceCode, templateCode, childLocation, errors);
        return;
      }

      if (!templateCode || typeof templateCode !== 'object') {
        errors.push(`The template should contain a style at ${JSON.stringify(childLocation)}`);
        return;
      }

      const templateColor = templateCode.color;
      if (templateColor && !checkValidCodeOrRgb(templateColor, Object.values(ForegroundSimpleCode))) {
        errors.push(`The template color is invalid at ${JSON.stringify(childLocation)}. It should be a ForegroundSimpleCode or ForegroundRgbCode`);
      }

      const templateBackgroundColor = templateCode.backgroundColor;
      if (templateBackgroundColor && !checkValidCodeOrRgb(templateBackgroundColor, Object.values(BackgroundSimpleCode))) {
        errors.push(`The template backgroundColor is invalid at ${JSON.stringify(childLocation)}. It should be a BackgroundSimpleCode or BackgroundRgbCode`);
      }

      const templateDecoration = templateCode.decoration;
      if (templateDecoration && !checkValidCode(templateDecoration, Object.values(DecorationCode))) {
        errors.push(`The template decoration is invalid at ${JSON.stringify(childLocation)}. It should be a DecorationCode`);
      }
    });

  return errors;
}

export function validateTemplate (reference: Record<string, any>, template: Record<string, any>): Record<string, any> {
  const errors = recursiveValidateTemplate(reference, template, [], []);

  if (errors.length) {
    throw new Error(`[Style template errors]\n* ${errors.join('\n* ')}`);
  }

  return template;
}
