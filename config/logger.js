const winston = require('winston');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
const infoLogPath = path.join(logsDir, 'infoLog/app-info.log');
const errorLogPath = path.join(logsDir, 'errorLog/app-error.log');

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.simple()
);

const logger = winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'node-task-api' },
  transports: [
    new winston.transports.File({ 
      filename: infoLogPath, 
      level: 'info',
      format: fileFormat 
    }),
    new winston.transports.File({ 
      filename: errorLogPath, 
      level: 'error',
      format: fileFormat 
    }),
    new winston.transports.Console({ 
      format: consoleFormat 
    })
  ]
});

const setupConsoleLogging = () => {
  // Override console.log → logger.info
  console.log = (...args) => {
    const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
    logger.info(message);
  };

  // Override console.error → logger.error
  console.error = (...args) => {
    const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
    logger.error(message);
  };

  // Override console.warn → logger.warn
  console.warn = (...args) => {
    const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
    logger.warn(message);
  };

  logger.info('Console logging overridden - logs now go to file and console (no duplicates)');
};

module.exports = { logger, setupConsoleLogging };