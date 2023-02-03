import mongoose from "mongoose";
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },

  likes: {
    type: [Object],
    required: true,
  }, createdAt: {
    type: Date,
    required: true,
  },  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
},{versionKey:false});
export  const Card = mongoose.model('card', cardSchema)