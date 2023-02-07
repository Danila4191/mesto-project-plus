import {
  Request,
  Response,
  NextFunction,
} from 'express';

const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  const statusCode = err.statusCode || 500;
  const messageErr = err.message || 'Ошибка на стороне сервера';
  res.status(statusCode).send({ message: messageErr });
  next();
};
export default errorHandler;
