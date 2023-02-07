import { Router } from 'express';
import {
  GetUsers,
  GetUserMe,
  Login,
  CreateUser,
  GetUserById,
  UpdateAvatar,
  UpdateUser,
} from '../controllers/users';
import auth from '../middlewares/auth';
import {
  validateUpdateMe,
  validateGetUser,
  validateGetUsers,
  validateGetMe,
  validateRegisterBody,
  validateLoginBody,
  validateUpdateAvatar,
} from '../middlewares/validation';

const userRouter = Router();
userRouter.post('/signin', Login);
userRouter.post('/signup', validateRegisterBody, CreateUser);
userRouter.use(auth);
userRouter.get('/', GetUsers);
userRouter.get('/id:userId', GetUserById);
userRouter.patch('/me/avatar', UpdateAvatar);
userRouter.patch('/me', UpdateUser);
userRouter.get('/me', GetUserMe);
export default userRouter;
