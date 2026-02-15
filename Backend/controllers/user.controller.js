import userModel from '../models/user.model.js';
import { createUser } from '../services/user.services.js';
import { validationResult } from 'express-validator';
import blackListToken from '../models/blacklistToken.model.js';

export const registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email })
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exist' })
    }
    
    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword // Pass the hashed password into the 'password' field
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');  //user ko find krte time password ko leke aana 

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const ismatch = await user.comparePassword(password);
    if (!ismatch) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const token = user.generateAuthToken();

    res.cookie('token', token, //{
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Set secure flag in production
        // sameSite: 'strict', // Adjust as needed (e.g., 'lax' or 'none' for cross-site)
        // maxAge: 24 * 60 * 60 * 1000 // 24 hours
        // }
    );

    res.status(201).json({ token, user });
}

export const getUserProfile = async (req, res, next) => {

    // humko yaha pr user mil gya h aur vo usr hmko auth se mila h ab usi user kiprofile ko hum dikhayege 
    res.status(200).json(req.user);

}


export const logoutUser = async (req, res, next) => {

    res.clearCookie('token');
    const token = req.cookies?.token || req.headers?.authorization.split(' ')[1];
    await blackListToken.create({ token });

    res.status(200).json({ message: 'Logged Out' });
}

