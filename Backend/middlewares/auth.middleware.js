import captainModel from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import blacklistTokenModel from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";

// captain autheticated h ki nhi humko vo check krna h iske throgh 

export const authUser = async (req, res, next) => {

    // token dekhege hum sbsse phle 
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ messsage: "Unauthorised" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // const captain = decodedToken._id;
        const User = await userModel.findById(decodedToken._id);
        console.log(User);
        
        if (!User) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
        req.user = User;
        return next();

    } catch (error) {
        return res.status(401).json({ messsage: "Unauthorised" ,  error });
    }
};

export const authCaptain = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ messsage: "Unauthorised captain" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized isCaptainAlreadyExist' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // const captain = decodedToken._id;
        const captain = await captainModel.findById(decodedToken._id);
        if (!captain) {
            return res.status(401).json({ message: "Unauthorized captain" });
        }
        req.captain = captain;
        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorised" });
    }
}