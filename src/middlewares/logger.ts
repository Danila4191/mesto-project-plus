import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: '/errors/log/request.log',
    }),
  ],
  format: winston.format.json(),
});

const transport = new winston.transports.DailyRotateFile({
  // указываем формат имени файла
  filename: '/errors/log/error.log',
  // указываем шаблон для даты
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: 14,
});
export const errorLogger = expressWinston.errorLogger({
  transports: [
    transport,
  ],
});
