import './env'
import express, { json, NextFunction, Request, Response } from "express";
import path from "path";
import router from "./routes/index";
import mongoose from "mongoose";
import { RequestCustom } from "types/types";

const app = express();
const { PORT = 123, DB_URL = "123" } = process.env;

app.use(json());
app.use(express.static(path.join(__dirname, "public")));
app.use((req: Request, res: Response, next: NextFunction) => {
const RequestCustom = req as RequestCustom
  req.body.user = {
    _id: "63dc5d624617a17f0791cf31",
  };
  next();
});
app.use(router);
async function startApp() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URL);
    console.log(`DB UP `);
    await app.listen(PORT);

    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}
startApp();



/*
//import jwt from 'jsonwebtoken';
//const bcrypt = require('bcryptjs'); // импортируем bcrypt
//import { traceDeprecation } from "process";
// controllers/users.js
...
import jwt from 'jsonwebtoken'
export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key',
  { expiresIn: 3600 });

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
/////////////////////
  const { celebrate, Joi } = require('celebrate');
  ////////////////////
  import winston from 'winston';
import expressWinston from 'express-winston';
*/
