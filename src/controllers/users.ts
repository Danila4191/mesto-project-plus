import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

export const GetUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'Такого пользователя не существует' });
    }
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
export const PostUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.user._id,
      { name: req.body.name, about: req.body.about },
    );
    if (!user) {
      // const error = new Error("Такого пользователя не существует");
      // error.name = "Not found";
      // throw error;
      return res.status(404).send({ message: 'Такого пользователя не существует' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
export const UpdateAvatar = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.user._id,
      { avatar: req.body.avatar },
    );
    if (!user) {
      // const error = new Error("Такого пользователя не существует");
      // error.name = "Not found";
      // throw error;
      return res.status(404).send({ message: 'Такого пользователя не существует' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
