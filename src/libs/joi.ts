import Joi from '@hapi/joi';
import {IUser} from '../models/User'

export const signupValidation = (data: IUser) => {
    const userSchema = Joi.object({
        username: Joi
            .string()
            .alphanum()
            .min(4)
            .max(30)
            .required(),
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(8)
            .required(),
        usertype: Joi
            .string()
            .regex(/^administrator|employee|client$/)
            .required()
    });
    return userSchema.validate(data);
};

export const signinValidation = (data: IUser) => {
    const userSchema = Joi.object({
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(8)
            .required()
    });
    return userSchema.validate(data);
};
