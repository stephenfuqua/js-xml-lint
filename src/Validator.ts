import validator from 'xsd-schema-validator';
import { XMLValidator } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import { Logger } from './Logger';

function parseOnly(xmlFile: string): void {
  // TODO: for now, assuming UTF-8 encoding
  const fileContents = readFileSync(xmlFile, { encoding: 'utf-8' });

  const result = XMLValidator.validate(fileContents);

  if (result === true) {
    Logger.info('XML file is well-formed');
    return;
  }

  // End program - do not want to proceed with XSD validation when the file is not well-formed.
  Logger.fatal('XML file is not well-formed:', result.err);
}

export function validateWithXsd(xmlFile: string, xsdFile: string): void {
  validator.validateXML(xmlFile, xsdFile, (err, result) => {
    console.warn(err, result);

    if (err) {
      Logger.fatal('Schema validation failed:', result || err);
    }

    Logger.info('No errors.');
  });
}

export function validateFile(xmlFile: string, xsdFile?: string | undefined): void {
  parseOnly(xmlFile);

  if (xsdFile) {
    validateWithXsd(xmlFile, xsdFile);
  }
}
