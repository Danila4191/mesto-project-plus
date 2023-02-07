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

cardRouter.get('/', GetCards);
cardRouter.use(auth);
cardRouter.delete('/:cardId', DeleteCard);
cardRouter.post('/', CreateCard);
cardRouter.put('/:cardId/likes', GetLike);
cardRouter.delete('/:cardId/likes', DeleteLike);
export default cardRouter;
