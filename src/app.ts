import './env';
import express, {
  json,
} from 'express';
import path from 'path';
import mongoose from 'mongoose';
import errorHandler from './middlewares/error-handler';
import router from './routes/index';
import { requestLogger, errorLogger } from './middlewares/logger';

const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const app = express();
const { PORT = 123, DB_URL = 'http//обход_линтера' } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function startApp() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB_URL);
    console.log('DB UP');
    await app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}
startApp();
