import winston from 'winston';

const timestampFormat: string = 'YYYY-MM-DD HH:mm:ss.SSS';

const format = winston.format.combine(
  winston.format.timestamp({
    format: timestampFormat,
  }),
  winston.format.printf(({ level, message, timestamp, extra, err }) => {
    const m = message;
    let e = err ?? extra ?? '';

    if (typeof e === 'object') {
      e = JSON.stringify(e);
    }

    return `${timestamp} ${level} ${m} ${e}`;
  }),
  winston.format.colorize({
    all: true,
  }),
);

// Logger begins life "uninitialized" and in silent mode
let isInitialized = false;

// Create and set up a silent default logger transport - in case a library is using the default logger
const transport = new winston.transports.Console();
transport.silent = true;
winston.configure({ transports: [transport] });

// Set initial logger to silent
let logger: winston.Logger = winston.createLogger({
  transports: [transport],
});

export function initializeLogging(): void {
  if (isInitialized) return;

  const offline = process.env.IS_LOCAL === 'true';
  isInitialized = true;
  logger = winston.createLogger({
    level: process.env.LOG_LEVEL?.toLocaleLowerCase() ?? (offline ? 'debug' : 'info'),
    transports: [
      new winston.transports.Console({
        format,
      }),
    ],
  });
}

export const Logger = {
  fatal: (message: string, err?: any | null) => {
    logger.error({ message: `💥 ${message}`, err });
  },
  error: (message: string, err?: any | null) => {
    logger.error({ message, err });
  },
  warn: (message: string) => {
    logger.warn({ message });
  },
  info: (message: string, extra?: any | null) => {
    logger.info({ message, extra });
  },
  debug: (message: string, extra?: any | null) => {
    logger.debug({ message, extra });
  },
  trace: (message: string) => {
    logger.debug({ message: JSON.stringify(message) });
  },
  child: () => Logger,
};
