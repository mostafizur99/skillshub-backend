/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

//Customm Log Format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} } [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),
  transports: [new transports.Console()],
});

const errorlogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),
  transports: [new transports.Console()],
});

export { logger, errorlogger };
