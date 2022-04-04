import Joi from '@hapi/joi';
import {IVuelo} from '../models/Vuelo'

export const vaddValidation = (data: IVuelo) => {
    const userSchema = Joi.object({
        airline: Joi
            .string()
            .alphanum()
            .required(),
        datetime: Joi
            .string()
            .regex(/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})(\s)([0-1][0-9]|2[0-3])(:)([0-5][0-9])$/)
            .required(),
        from: Joi
            .string()
            .required(),
        to: Joi
            .string()
            .required(),
        maxpassegers: Joi
            .number()
            .required()
    });
    return userSchema.validate(data);
};