import jwt from 'jsonwebtoken';
import {
  NextFunction,
  Response,
} from 'express';
import { RequestCustom } from '../types/types';

const { JWT = '123' } = process.env;
const auth = async (req: RequestCustom, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  let payload:any;
  try {
    payload = await jwt.verify(token, JWT);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
export default auth;
