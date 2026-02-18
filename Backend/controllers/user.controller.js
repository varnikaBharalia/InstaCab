import userModel from '../models/user.model.js';
import { createUser } from '../services/users.services.js'; // Ensure filename matches your project
import { validationResult } from 'express-validator';
import blackListToken from '../models/blacklistToken.model.js';

export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    try {
        const isUserAlreadyExist = await userModel.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword 
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (err) {
        // Prevent crash if DB fails
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

export const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');
        
        // FIXED: Added optional chaining (?.) to prevent crash if header is missing
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (token) {
            await blackListToken.create({ token });
        }

        res.status(200).json({ message: 'Logged Out' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}