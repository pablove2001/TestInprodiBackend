import { Request, Response } from 'express'

import User from '../models/User'
import Vuelo, { IVuelo } from '../models/Vuelo'
import { vaddValidation } from '../libs/vuelo.joi'

export const vcreate = async (req: Request, res: Response) => {
    // Validation User Administrator
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'administrator') {
        return res.status(403).json('User without permissions');
    }

    // Validation Vuelo
    const { error } = vaddValidation(req.body);
    if (error) return res.status(400).json(error.message);
    
    // Saving a new Vuelo
    try {
        const newVuelo: IVuelo = new Vuelo({
            airline: req.body.airline,
            datetime: req.body.datetime,
            from: req.body.from,
            to: req.body.to,
            maxpassegers: req.body.maxpassegers
        });

        const savedVuelo = await newVuelo.save();
        res.json(savedVuelo);
    } catch (e) {
        res.status(400).json(e);
    }
}

export const vdelete = async (req: Request, res: Response) => {
    // Validation User Administrator
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    if (user.usertype != 'administrator') {
        return res.status(403).json('User without permissions');
    }

    // Delete Vuelo
    await Vuelo.findOneAndRemove({ _id: req.body._id });
    res.json({ response: 'Vuelo deleted Successfully' });
}

export const seevuelos = async (req: Request, res: Response) => {
    const vuelos = await Vuelo.find();
    res.json({ vuelos });
}

export const buyvuelos = async (req: Request, res: Response) => {
    // Validation User Client
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    console.log(user.usertype);
    if (user.usertype != 'client') {
        return res.status(403).json('User without permissions');
    }

    // Buy Vuelo
    const vuelo = await Vuelo.findOne({ _id: req.body._id });
    if (!vuelo) {
        return res.status(404).json('No Vuelo found');
    }
    if (req.body.numpassegers <= 0) {
        return res.status(400).json('The number of hundreds is wrong');
    }
    if ( vuelo.passegerslist.length + req.body.numpassegers > vuelo.maxpassegers ) {
        return res.status(416).json('Number of seats not available');
    }

    for (let i = 0; i < req.body.numpassegers; i++) {
        vuelo.passegerslist.push(user.email);
    }    

    const savedVuelo = await vuelo.save();
    res.json(savedVuelo);
}

export const seevuelosemployee = async (req: Request, res: Response) => {
    // Validation User Employee
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    console.log(user.usertype);
    if (user.usertype != 'employee') {
        return res.status(403).json('User without permissions');
    }

    // See
    if (req.body.datetime == undefined) return res.status(400).json('falta la fecha');

    const vuelos = await Vuelo.find({ datetime: req.body.datetime });
    //const vuelos = await Vuelo.find({datetime: {$regex: /^a/, $options: 'i'}});
    //const vuelos = await Vuelo.find({ datetime: req.body }).where('datetime').in(req.body.date);
    res.json({ vuelos });
    console.log('hola', req.body.date)
}