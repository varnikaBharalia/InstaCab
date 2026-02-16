import { validationResult } from "express-validator";
import * as mapService from "../services/maps.service.js";


export const getCoordinates = async (req, res, next) => {

    // Check for validation errors from the router
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error("Map Service Error:", error.message);
        res.status(404).json({ message: 'Coordinates not found', error: error.message });
    }
};

export const getDistanceTime = async (req, res, next) => {
    try {
        // 1. Check for validation errors (from the router)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // 2. Extract query parameters
        const { origin, destination } = req.query;

        // 3. Call the service (OpenStreetMap logic)
        const distanceTime = await mapService.getDistanceTime(origin, destination);

        // 4. Send the successful response
        res.status(200).json(distanceTime);

    } catch (error) {
        console.error("Distance Controller Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error("Suggestion Controller Error:", err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};