import { validateFile } from './Validator';
import { getCommand } from './ClI';
import { initializeLogging } from './Logger';

initializeLogging();

const parsedArgs = getCommand(process.argv);
validateFile(parsedArgs.xmlFile, parsedArgs.xsdFile);
