import express from "express"
const router = express.Router();
import { body } from "express-validator";
import { createRideController } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";


router.post('/create' ,authUser,
    // body('userId').isString().isLength({min:24,max:24}).withMessage('Invalid user id'),
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destinantion address'),
    body('vehicleType').isString().isIn(['auto','car','motorbike']).withMessage('Invalid vehicle')
    
    , createRideController)


export default router