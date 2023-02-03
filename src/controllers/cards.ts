import { Request, Response } from "express";
import { request } from "http";
import mongoose from "mongoose";
import { Card } from "../models/card";
import { RequestCustom } from "../types/types";
const { PORT = 123, DB_URL = "123" } = process.env;





export const GetCards = async (req: RequestCustom, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (err) {

    console.log(err);
    return res.status(500).send({ message: "ошибка сервера" });
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
    return res.status(500).send({ message: "ошибка сервера" });
  }
};
export const DeleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      // const error = new Error("Такого пользователя не существует");
      // error.name = "Not found";
      // throw error;
      throw res.status(404).send({ message: "Такого карточки не существует" })

     }
    return res.status(200).send(card);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "ошибка сервера" });
  }
};
export const GetLike = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.body.user._id } }
    );
    if (!card) {
      // const error = new Error("Такого пользователя не существует");
      // error.name = "Not found";
      // throw error;
      throw res.status(404).send({ message: "Такого карточки не существует" })

     }
    return res.status(200).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    console.log(err);
    return res.status(500).send({ message: "ошибка сервера" });
  }
};
/////исправить удаление лайка
export const DeleteLike = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(cardId, { $pull: { likes: req.body.user._id } } );
    if (!card) {
      // const error = new Error("Такого пользователя не существует");
      // error.name = "Not found";
      // throw error;
      throw res.status(404).send({ message: "Такого карточки не существует" })

     }
    return res.status(200).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    console.log(err);
    return res.status(500).send({ message: "ошибка сервера" });
  }
};