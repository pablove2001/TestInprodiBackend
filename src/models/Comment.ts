import { Schema, model, Document } from 'mongoose'

export interface IComment extends Document {
    iduser: string;
    commenttext: string;
};

const userSchema = new Schema({
    iduser: {
        type: String,
        required: true
    },
    commenttext: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model<IComment>('Comment', userSchema);