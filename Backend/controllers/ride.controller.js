import { getAddressCoordinate, getCaptainsInTheRadius } from '../services/maps.service.js';
import { createRide, getFare } from '../services/ride.services.js';
import { validationResult } from 'express-validator';


export const createRideController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        const pickupCoordinates=await getAddressCoordinate(pickup);
        console.log(pickupCoordinates);
    
        const captainInRadius = await getCaptainsInTheRadius(pickupCoordinates)

    } catch (error) {
        return res.status(500).json({ messgae: error.message });

    }
}


export const getFareController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFare(pickup, destination);
        return res.status(201).json(fare);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}