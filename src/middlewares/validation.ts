const { celebrate, Joi } = require('celebrate');

export const validateRegisterBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().min(5),
    about: Joi.string().min(2).max(30),
  }),
});
export const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
export const validateGetUsers = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});
export const validateGetUser = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  params: Joi.object().keys({
    postId: Joi.string().alphanum(),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});
export const validateUpdateAvatar = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().required().min(5),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});

export const validateUpdateMe = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().min(5),
    about: Joi.string().min(2).max(30),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});
export const validateGetMe = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});
export const validateGetCards = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});
export const validateCardDelete = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  params: Joi.object().keys({
    postId: Joi.string().alphanum(),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});
export const validateCreateCard = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(5),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});
export const validatePutLike = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  params: Joi.object().keys({
    postId: Joi.string().alphanum(),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});
export const validateDeleteLike = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  params: Joi.object().keys({
    postId: Joi.string().alphanum(),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});