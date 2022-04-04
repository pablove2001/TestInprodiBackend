import { Schema, model, Document } from 'mongoose'

export interface IBaggage extends Document {
    idvuelo: string;
    emailuser: string;
    baggagedescrip: string;
};

const userSchema = new Schema({
    idvuelo: {
        type: String,
        required: true
    },
    emailuser: {
        type: String,
        required: true
    },
    baggagedescrip: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model<IBaggage>('Baggage', userSchema);