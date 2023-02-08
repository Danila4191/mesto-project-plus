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
  }).unknown(true),
  params: Joi.object().keys({
    postId: Joi.string().alphanum(),
  }).unknown(true),
});
export const validateUpdateAvatar = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().required().min(5),
  }),
});

export const validateUpdateMe = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().min(5),
    about: Joi.string().min(2).max(30),
  }),
});
export const validateGetMe = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});
export const validateGetCards = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});
export const validateCardDelete = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
  params: Joi.object().keys({
    postId: Joi.string().alphanum(),
  }).unknown(true),
});
export const validateCreateCard = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(5),
  }),
});
export const validatePutLike = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
  params: Joi.object().keys({
    postId: Joi.string().alphanum(),
  }).unknown(true),
});
export const validateDeleteLike = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
  params: Joi.object().keys({
    postId: Joi.string().alphanum(),
  }).unknown(true),
});
