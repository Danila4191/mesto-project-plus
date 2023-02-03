import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
},{versionKey:false});


export  const User = mongoose.model('user', userSchema)
