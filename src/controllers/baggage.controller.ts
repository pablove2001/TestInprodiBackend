import { Request, Response } from 'express'

import User from '../models/User'
import Vuelo from '../models/Vuelo'
import Baggage, { IBaggage } from '../models/Baggage'
import { baggageValidation } from '../libs/baggage.joi'

export const badd = async (req: Request, res: Response) => {
    // Validation User Client
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'client') {
        return res.status(403).json('User without permissions');
    }

    // Validation Baggage
    const { error } = baggageValidation(req.body);
    if (error) return res.status(400).json(error.message);

    // Validation Vuelo
    const vuelo = await Vuelo.findOne({ _id: req.body.idvuelo });
    if (!vuelo) {
        return res.status(404).json('No Vuelo found');
    }

    // Validation User
    if (!(vuelo.passegerslist.some(e => e == user.email))) {
        return res.status(404).json('No Passager found on Vuelo');
    }

    // Validar add
    const baggage = await Baggage.find({ idvuelo: req.body.idvuelo, emailuser: user.email });
    try {
        if (typeof baggage[0]._id === 'object') {
            return res.status(400).json('The baggage has already been registered');
        }
    }catch (e) {}

    // Saving a new Baggage
    try {
        const newBaggage: IBaggage = new Baggage({
            idvuelo: req.body.idvuelo,
            emailuser: user.email,
            baggagedescrip: req.body.baggagedescrip
        });

        const savedBaggage = await newBaggage.save();
        res.json(savedBaggage);
    } catch (e) {
        res.status(400).json(e);
    }
}

export const bsee = async (req: Request, res: Response) => {
    // Validation User Client
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'client') {
        return res.status(403).json('User without permissions');
    }
    
    const baggage = await Baggage.find({ emailuser: user.email });
    res.json({ baggage });
}

export const bseeemployee = async (req: Request, res: Response) => {
    // Validation User Employee
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'employee') {
        return res.status(403).json('User without permissions');
    }
    
    const baggage = await Baggage.find();
    res.json({ baggage });
}

export const bdelete = async (req: Request, res: Response) => {
    // Validation User Client
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'client') {
        return res.status(403).json('User without permissions');
    }

    // Delete Baggage
    const baggageadelete = await Baggage.findOneAndRemove({ _id: req.body._id, emailuser: user.email });
    if(baggageadelete) res.json({ response: 'Baggage deleted' });
    else res.json({ response: 'Baggage no deleted' });
}

export const bdeleteemployee = async (req: Request, res: Response) => {
    // Validation User Employee
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'employee') {
        return res.status(403).json('User without permissions');
    }

    // Delete Baggage
    const baggageadelete = await Baggage.findOneAndRemove({ _id: req.body._id });
    if(baggageadelete) res.json({ response: 'Baggage deleted' });
    else res.json({ response: 'Baggage no deleted' });
}