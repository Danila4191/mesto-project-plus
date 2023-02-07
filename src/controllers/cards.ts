
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import { RequestCustom } from '../types/types';
import BadRequestErr from '../errors/bad-Request';
import NotFoundErr from '../errors/not-found';
import AccessErr from '../errors/access';

export const GetCards = async (req: RequestCustom, res: Response, next:NextFunction) => {

  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (err) {

    console.log(err);
    next(err);
  }
};

export const CreateCard = async (req: RequestCustom, res: Response, next:NextFunction) => {

  try {
    const newCard = await Card.create({
      name: req.body.name,
      link: req.body.link,
      createdAt: new Date(),
      likes: [],
      owner: req.user?._id,
    });
    return res.status(200).send(newCard);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {

      next(new BadRequestErr(err.message));
    } else {
      console.log(err);
      next(err);
    }
  }
};
export const DeleteCard = async (req: RequestCustom, res: Response, next:NextFunction) => {
  try {
    const { cardId } = req.params;
    const cardOwner = await Card.findById(cardId);
    if (req.user?._id.toString() !== cardOwner?.owner.toString()) {
      throw new AccessErr('Ошибка доступа, это не ваша карточка');
    }
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      throw new NotFoundErr('Такой карточки не существует');
    }
    return res.status(200).send(card);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const GetLike = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.body.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundErr('Такой карточки не существует');
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestErr(err.message));
    } else {
      console.log(err);
      next(err);
    }
  }
};
export const DeleteLike = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.body.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundErr('Такой карточки не существует');
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestErr(err.message));
    } else {
      console.log(err);
      next(err);
    }

  }
};
