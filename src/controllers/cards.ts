import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import { RequestCustom } from '../types/types';

export const GetCards = async (req: RequestCustom, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
export const CreateCard = async (req: RequestCustom, res: Response) => {
  try {
    const newCard = await Card.create({
      name: req.body.name,
      link: req.body.link,
      createdAt: new Date(),
      likes: [],
      owner: req.body.user?._id,
    });
    return res.status(200).send(newCard);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
export const DeleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      return res.status(404).send({ message: 'Такого карточки не существует' });
    }
    return res.status(200).send(card);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
export const GetLike = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.body.user._id } },
      { new: true },
    );
    if (!card) {
      // const error = new Error("Такого пользователя не существует");
      // error.name = "Not found";
      // throw error;
      return res.status(404).send({ message: 'Такого карточки не существует' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
export const DeleteLike = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.body.user._id } },
      { new: true },
    );
    if (!card) {
      // const error = new Error("Такого пользователя не существует");
      // error.name = "Not found";
      // throw error;
      return res.status(404).send({ message: 'Такого карточки не существует' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    console.log(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
