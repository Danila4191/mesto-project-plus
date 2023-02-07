import { Router } from 'express';
import {
  GetCards,
  CreateCard,
  DeleteCard,
  GetLike,
  DeleteLike,
} from '../controllers/cards';
import auth from '../middlewares/auth';
import {
  validateDeleteLike,
  validatePutLike,
  validateCreateCard,
  validateCardDelete,
  validateGetCards,
} from '../middlewares/validation';

const cardRouter = Router();

cardRouter.get('/', validateGetCards, GetCards);
cardRouter.use(auth);
cardRouter.delete('/:cardId', validateCardDelete, DeleteCard);
cardRouter.post('/', validateCreateCard, CreateCard);
cardRouter.put('/:cardId/likes', validatePutLike, GetLike);
cardRouter.delete('/:cardId/likes', validateDeleteLike, DeleteLike);
export default cardRouter;
