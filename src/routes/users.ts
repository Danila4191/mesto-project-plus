
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
userRouter.post('/signin', validateLoginBody, Login);
userRouter.post('/signup', validateRegisterBody, CreateUser);
userRouter.use(auth);
userRouter.get('/', validateGetUsers, GetUsers);
userRouter.get('/id:userId', validateGetUser, GetUserById);
userRouter.patch('/me/avatar', validateUpdateAvatar, UpdateAvatar);
userRouter.patch('/me', validateUpdateMe, UpdateUser);
userRouter.get('/me', validateGetMe, GetUserMe);
export default userRouter;

