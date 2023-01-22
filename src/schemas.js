import Joi from 'joi';

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const entrySchema = Joi.object({
    description: Joi.string().required(),
    value: Joi.number().required(),
    type: Joi.string().valid('expense', 'income').required()
});