import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import BadRequestErr from '../errors/bad-Request';
import AuthorizationErr from '../errors/authorization';
import NotFoundErr from '../errors/not-found';
import UserCreateErr from '../errors/create-user';

import User from '../models/user';
import { RequestCustom } from '../types/types';

const bcrypt = require('bcryptjs');

const { JWT = 'обход линта' } = process.env;
export const GetUsers = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetUserById = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundErr('Такого пользователя не существует');
    }
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const UpdateUser = async (req: RequestCustom, res: Response, next:NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(req.user?._id, {
      name: req.body.name,
      about: req.body.about,
    }, { runValidators: true, new: true });
    if (!user) {
      throw new NotFoundErr('Такого пользователя не существует');
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestErr(err.message));
    } else {
      console.log(err);
      next(err);
    }
  }
};
export const UpdateAvatar = async (req: RequestCustom, res: Response, next:NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(req.user?._id, {
      avatar: req.body.avatar,
    }, { runValidators: true, new: true });
    if (!user) {
      throw new NotFoundErr('Такого пользователя не существует');
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestErr(err.message));
    } else {
      console.log(err);
      next(err);
    }
  }
};
export const CreateUser = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new UserCreateErr('Такой пользователь существует');
    }
    if (req.body.password.lenght === 0) {
      throw new BadRequestErr('Пароль пустой');
    }
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const newUser = await User.create(req.body);
    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestErr(err.message));
    } else {
      console.log(err);
      next(err);
    }
  }
};

export const Login = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user) {
      throw new AuthorizationErr('Неправильные почта или пароль');
    }
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      throw new AuthorizationErr('Неправильные почта или пароль');
    }
    const token = jwt.sign({ _id: user._id }, JWT, { expiresIn: '7d' });
    return res.send({ token });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestErr(err.message));
    } else {
      console.log(err);
      next(err);
    }
  }
};

export const GetUserMe = async (req: RequestCustom, res: Response, next:NextFunction) => {
  try {
    let userId;
    if (req.user !== undefined) {
      userId = await req.user._id;
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundErr('Такого пользователя не существует');
    }
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
