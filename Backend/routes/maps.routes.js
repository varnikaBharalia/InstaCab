import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { getCoordinates, getDistanceTime, getSuggestions } from "../controllers/map.controller.js";
import { query } from "express-validator";

const router = express.Router();

// Route for getting coordinates from an address
router.get('/get-coordinates', 
    query('address').isString().isLength({ min: 3 }),
    authUser,
    getCoordinates
);

// Route for getting distance and time between two points
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser,
    getDistanceTime
);

// Route for autocomplete suggestions
router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authUser,
    getSuggestions
);

export default router;