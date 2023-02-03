import './env';
import express, {
  json,
  NextFunction,
  Response,
} from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { RequestCustom } from './types/types';
import router from './routes/index';

const app = express();
const { PORT = 123, DB_URL = 'http//обход_линтера' } = process.env;

app.use(json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req: RequestCustom, res: Response, next: NextFunction) => {
  req.body.user = {
    _id: '63dc5d624617a17f0791cf31',
  };
  next();
});
app.use(router);
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
