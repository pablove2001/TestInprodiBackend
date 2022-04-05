import { Request, Response } from 'express'

import User from '../models/User'
import Vuelo from '../models/Vuelo'

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

export const seebuy = async (req: Request, res: Response) => {
    // Validation User Client
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('No User found');
    }
    console.log(user.usertype);
    if (user.usertype != 'client') {
        return res.status(403).json('User without permissions');
    }
    
    // See
    const vuelos = await Vuelo.find({ passegerslist:user.email }).select("-passegerslist").select("-createdAt").select("-updatedAt").select("-__v");

    res.json({ vuelos });
}