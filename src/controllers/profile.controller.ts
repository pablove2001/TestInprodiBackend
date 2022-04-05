import { Request, Response } from 'express'

import User from '../models/User'

export const psee = async (req: Request, res: Response) => {
    // Validation User
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    
    res.json(user);
}

export const pseeemploye = async (req: Request, res: Response) => {
    // Validation User Employee
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'employee') {
        return res.status(403).json('User without permissions');
    }

    const pusers = await User.find(); 
    res.json(pusers);
}

export const pdelete = async (req: Request, res: Response) => {
    // Validation User
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }

    // Delete User
    const userdelete = await User.findOneAndRemove({ _id: user._id });
    if(userdelete) res.json({ response: 'User deleted' });
    else res.json({ response: 'User no deleted' });
}

export const pdeleteemployee = async (req: Request, res: Response) => {
    // Validation User Employee
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'employee') {
        return res.status(403).json('User without permissions');
    }

    // the user to delete is not an administrator or an employee
    const userd = await User.findOne({ _id: req.body._id })
    if (!userd) {
        return res.status(404).json('No User found');
    }
    if(userd.usertype == 'administrator' || userd.usertype == 'employee') {
        return res.status(403).json('User without permissions');
    }

    // Delete User
    const userdelete = await User.findOneAndRemove({ _id: req.body._id });
    if(userdelete) res.json({ response: 'User deleted' });
    else res.json({ response: 'User no deleted' });
}

export const pdeleteadministrator = async (req: Request, res: Response) => {
    // Validation User Administrator
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'administrator') {
        return res.status(403).json('User without permissions');
    }

    // the user to delete is not an administrator
    const userd = await User.findOne({ _id: req.body._id })
    if (!userd) {
        return res.status(404).json('No User found');
    }
    if(userd.usertype == 'administrator') {
        return res.status(403).json('User without permissions');
    }

    // Delete User
    const userdelete = await User.findOneAndRemove({ _id: req.body._id });
    if(userdelete) res.json({ response: 'User deleted' });
    else res.json({ response: 'User no deleted' });
}