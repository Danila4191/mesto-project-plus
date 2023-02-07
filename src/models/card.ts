import mongoose from 'mongoose';
import { validatorUrl } from '../utils/utils';

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      validate: {
        validator(v:string) {
          return validatorUrl.test(v);
        },
      },
      required: true,
    },
    likes: {
      type: [Object],
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { versionKey: false },
);
const Card = mongoose.model('card', cardSchema);
export default Card;
