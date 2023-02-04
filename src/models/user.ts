import mongoose from 'mongoose';
import validatorUrl from '../utils/utils';

const userSchema = new mongoose.Schema(
  {
    name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
      type: String, // имя — это строка
      required: true, // имя — обязательное поле
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String, // — это строка
      required: true, // имя — обязательное поле
      validate: {
        validator(v:string) {
          return validatorUrl.test(v);
        },
      },
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

const User = mongoose.model('user', userSchema);
export default User;
