import Joi from '@hapi/joi';
import {IComment} from '../models/Comment'

export const commentValidation = (data: IComment) => {
    const userSchema = Joi.object({
        commenttext: Joi
            .string()
            .min(10)
            .max(200)
            .required()
    });
    return userSchema.validate(data);
};