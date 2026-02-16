import { createRide, getFare, confirmRide, startRide, endRide } from '../services/rides.services.js';
import { getAddressCoordinate, getCaptainsInTheRadius } from '../services/maps.services.js';
import { validationResult } from 'express-validator';
import { sendMessageToSocketId } from '../socket.js';
import rideModel from '../models/ride.model.js';

export const createRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        // 1. Create the Ride record in DB
        const ride = await createRide({ 
            user: req.user._id, 
            pickup, 
            destination, 
            vehicleType 
        });

        // 2. Get Coordinates for the pickup location
        const pickupCoordinates = await getAddressCoordinate(pickup);
        
        // 3. Find Captains within a 2km Radius
        const captainsInRadius = await getCaptainsInTheRadius(
            pickupCoordinates.ltd, 
            pickupCoordinates.lng, 
            2 
        );

        // Security: Clear OTP from the ride object before broadcasting
        ride.otp = ""; 

        // 4. Populate User details so Captains see who the passenger is
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        // 5. Notify all eligible Captains via Socket
        captainsInRadius.forEach(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });

        // 6. Final response to the User (Passenger)
        return res.status(201).json(ride);

    } catch (err) {
        console.error("Create Ride Error:", err);
        return res.status(500).json({ message: err.message });
    }
};

export const getFareController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const confirmRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRide({ rideId, captain: req.captain });

        // Notify User that a Captain has accepted
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Confirm Ride Error:", err);
        return res.status(500).json({ message: err.message });
    }
};

export const startRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRide({ rideId, otp, captain: req.captain });

        // Notify User that the journey has begun
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const endRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await endRide({ rideId, captain: req.captain });

        // Notify User that they have reached the destination
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};