import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captains.services.js";
import { validationResult } from "express-validator";
import blackListToken from '../models/blacklistToken.model.js';
import jwt from "jsonwebtoken";
import rideModel from "../models/ride.model.js";


export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    try {
        const isCaptainAlreadyExist = await captainModel.findOne({ email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        res.status(201).json({ message: "Captain registered successfully", token, captain });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const captain = await captainModel.findOne({ email }).select('+password');
        console.log(captain);

        if (!captain) {
            console.log(captain);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Captain logged in successfully", token, captain });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}





// export const getCaptainProfile = async (req, res, next) => {
//     res.status(200).json({ captain: req.captain });
// }


export const getCaptainProfile = async (req, res) => {
    try {
        const captainId = req.captain._id;

        // 🔥 1. Fetch ALL completed rides for this captain
        const rides = await rideModel.find({
            captain: captainId,
            status: 'completed'
        });

        // 🔥 2. TOTAL RIDES
        const totalRides = rides.length;

        // 🔥 3. TOTAL EARNINGS
        const totalEarnings = rides.reduce((sum, ride) => {
            return sum + (ride.fare || 0);
        }, 0);

        // 🔥 4. TOTAL DISTANCE (meters → convert in frontend)
        const totalDistance = rides.reduce((sum, ride) => {
            return sum + (ride.distance || 0);
        }, 0);

        // 🔥 5. TOTAL TIME (seconds → convert in frontend)
        const totalTime = rides.reduce((sum, ride) => {
            return sum + (ride.duration || 0);
        }, 0);

        // 🔥 6. RESPONSE
        res.status(200).json({
            captain: req.captain,
            stats: {
                totalRides,
                totalEarnings,
                totalDistance,
                totalTime
            }
        });

    } catch (err) {
        console.error("Captain Profile Error:", err.message);
        res.status(500).json({
            message: "Failed to fetch captain profile",
            error: err.message
        });
    }
};

export const logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (token) {
            await blackListToken.create({ token });
        }

        res.clearCookie('token');
        res.status(200).json({ message: 'Logged Out' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}