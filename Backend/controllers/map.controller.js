import { validationResult } from "express-validator";
import { getAddressCoordinate, getDistanceTime as getDistanceTimeService, getAutoCompleteSuggestions } from "../services/maps.services.js";

export const getCoordinates = async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error("Map Service Error:", error.message);
        res.status(404).json({ message: 'Coordinates not found', error: error.message });
    }
};

export const getDistanceTime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        // Call the service (OpenStreetMap logic)
        const distanceTime = await getDistanceTimeService(origin, destination);

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

        const suggestions = await getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error("Suggestion Controller Error:", err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};