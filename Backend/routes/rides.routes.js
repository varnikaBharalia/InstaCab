import express from "express"
const router = express.Router();
import { body  , query} from "express-validator";
import { createRideController, getFareController } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import getFare from "../services/ride.services.js";


router.post('/create', authUser,
    // body('userId').isString().isLength({min:24,max:24}).withMessage('Invalid user id'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destinantion address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle'),
    createRideController
);
router.get('/get-fare', 
    authUser,
    // 👇 FIX: Check query params, not body
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    getFareController
);

export default router