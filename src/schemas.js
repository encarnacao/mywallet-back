import JoiBase from 'joi';
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const entrySchema = Joi.object({
    description: Joi.string().required(),
    value: Joi.number().required(),
    type: Joi.string().valid('expense', 'income').required(),
    date: Joi.date().format("DD/MM").required()
});