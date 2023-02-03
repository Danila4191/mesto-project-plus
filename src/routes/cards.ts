import { Router } from 'express';
import {
  GetCards,
  CreateCard,
  DeleteCard,
  GetLike,
  DeleteLike,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', GetCards);
cardRouter.delete('/:cardId', DeleteCard);
cardRouter.post('/', CreateCard);
cardRouter.put('/:cardId/likes', GetLike);
cardRouter.delete('/:cardId/likes', DeleteLike);
export default cardRouter;
