import { Request, Response } from 'express'

import User from '../models/User'
import Comment, { IComment } from '../models/Comment'
import { commentValidation } from '../libs/comment.joi'

export const cadd = async (req: Request, res: Response) => {
    // Validation User Client
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'client') {
        return res.status(403).json('User without permissions');
    }

    // Validation Comment
    const { error } = commentValidation(req.body);
    if (error) return res.status(400).json(error.message);

    // Saving new Comment
    try {
        const newComment: IComment = new Comment({
            iduser: user._id,
            commenttext: req.body.commenttext
        });

        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (e) {
        res.status(400).json(e);
    }
}

export const csee = async (req: Request, res: Response) => {
    // Validation User Client
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'client') {
        return res.status(403).json('User without permissions');
    }
    
    const comment = await Comment.find({ iduser: user._id });
    res.json({ comment });
}

export const cseeemployee = async (req: Request, res: Response) => {
    // Validation User Employee
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'employee') {
        return res.status(403).json('User without permissions');
    }
    
    const comment = await Comment.find();
    res.json({ comment });
}

export const cdelete = async (req: Request, res: Response) => {
    // Validation User Client
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'client') {
        return res.status(403).json('User without permissions');
    }

    // Delete Comment
    const commentadelete = await Comment.findOneAndRemove({ _id: req.body._id, iduser: user._id });
    if(commentadelete) res.json({ response: 'Comment deleted' });
    else res.json({ response: 'Comment no deleted' });
}

export const cdeleteemployee = async (req: Request, res: Response) => {
    // Validation User Employee
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'employee') {
        return res.status(403).json('User without permissions');
    }

    // Delete Baggage
    const commentadelete = await Comment.findOneAndRemove({ _id: req.body._id });
    if(commentadelete) res.json({ response: 'Comment deleted' });
    else res.json({ response: 'Comment no deleted' });
}