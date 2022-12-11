import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { existsSync } from 'fs';
import { Arguments } from './Arguments';
import { Logger } from './Logger';

function parseArguments(argv: string[]): Arguments {
  const { x, s } = yargs(hideBin(argv))
    .options({
      x: { type: 'string', demandOption: true, alias: 'xml-file', description: 'XML file to validate' },
      s: { type: 'string', demandOption: false, alias: 'schema-file', description: 'Schema (XSD) file' },
    })
    .epilog('Validate a single XML file, with or without XSD.')
    .parseSync();

  return { xmlFile: x, xsdFile: s };
}

function throwErrorIfFileDoesNotExist(filePath: string): void {
  if (!existsSync(filePath)) {
    Logger.fatal(`File does not exist or cannot be read: '${filePath}`);
  }
}

export function getCommand(argv: string[]): Arguments {
  const args = parseArguments(argv);
  throwErrorIfFileDoesNotExist(args.xmlFile);

  if (args.xsdFile) {
    throwErrorIfFileDoesNotExist(args.xsdFile);
  }

  return args;
}
