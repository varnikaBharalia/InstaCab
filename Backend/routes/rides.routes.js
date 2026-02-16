import express from 'express';
import { body, query } from 'express-validator';
import { authUser, authCaptain } from '../middlewares/auth.middleware.js';
import { 
    createRideController, 
    getFareController, 
    confirmRideController, 
    startRideController, 
    endRideController 
} from '../controllers/ride.controller.js';

const router = express.Router();

// 1. Create Ride (User)
router.post('/create', 
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    createRideController
);

// 2. Get Fare (User)
router.get('/get-fare', 
    authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    getFareController
);

// 3. Confirm Ride (Captain)
router.post('/confirm', 
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRideController
);

// 4. Start Ride (Captain)
router.get('/start-ride', 
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    startRideController
);

// 5. End Ride (Captain)
router.post('/end-ride', 
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRideController
);

export default router;