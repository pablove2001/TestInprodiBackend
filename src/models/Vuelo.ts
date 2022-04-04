import { Schema, model, Document } from 'mongoose'

export interface IVuelo extends Document {
    airline: string;
    datetime: string;
    from: string;
    to: string;
    maxpassegers: number;
    passegerslist: string[];
};

const userSchema = new Schema({
    airline: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    maxpassegers: {
        type: Number,
        required: true
    },
    passegerslist: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

export default model<IVuelo>('Vuelo', userSchema);