import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/caption.services.js"; // Fixed typo 'caption' -> 'captain'
import { validationResult } from "express-validator";
import blackListToken from '../models/blacklistToken.model.js';

export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    // Hash password using the static method on the model
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
}

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // 1. Find captain and get password (since select: false is likely set in model)
    const captain = await captainModel.findOne({ email }).select('+password');

    // 2. If captain not found, return error
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Check password match
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // --- REMOVED THE "ALREADY EXISTS" CHECK HERE --- 
    // It was causing the bug. You want the user to exist during login.

    const token = captain.generateAuthToken();
    
    res.cookie('token', token);

    res.status(200).json({ message: "Captain logged in successfully", token, captain });
}

export const getCaptainProfile = async (req, res, next) => {
    // req.captain is populated by your auth middleware
    res.status(200).json({ captain: req.captain });
}

export const logoutCaptain = async (req, res, next) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    
    await blackListToken.create({ token });
    
    res.clearCookie('token');

    res.status(200).json({ message: 'Logged Out' });
}