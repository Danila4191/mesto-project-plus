import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  format: winston.format.json(),
});

const transport = new winston.transports.DailyRotateFile({
  // указываем формат имени файла
  filename: 'error.log',
  // указываем шаблон для даты
  // datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: 14,
});
export const errorLogger = expressWinston.errorLogger({
  transports: [
    transport,
  ],
});
