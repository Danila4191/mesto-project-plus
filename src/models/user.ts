
import mongoose from 'mongoose';
import { validatorUrl, validatorEmail } from '../utils/utils';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    avatar: {
      type: String,
      validate: {
        validator(v: string) {
          return validatorUrl.test(v);
        },
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      unique: true,
      validate: {
        validator(v: string) {
          return validatorEmail.test(v);
        },
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // возможно надо поменять
    },
  },
  { versionKey: false },
);

const User = mongoose.model('User', userSchema);
export default User;

