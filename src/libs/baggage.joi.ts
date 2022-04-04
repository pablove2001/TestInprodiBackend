import Joi from '@hapi/joi';
import {IBaggage} from '../models/Baggage'

export const baggageValidation = (data: IBaggage) => {
    const userSchema = Joi.object({
        idvuelo: Joi
            .string()
            .required(),
        baggagedescrip: Joi
            .string()
            .min(8)
            .max(100)
            .required()
    });
    return userSchema.validate(data);
};