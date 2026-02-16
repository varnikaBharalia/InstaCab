import axios from 'axios';
import captainModel from '../models/captain.model.js';

// ====================================================================
// 🗺️ OPENSTREETMAP / NOMINATIM SERVICES (FREE & ACTIVE)
// ====================================================================

export const getAddressCoordinate = async (address) => {
    // 1. URL for OpenStreetMap (Nominatim) - No API Key needed
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'InstaCab-App/1.0' // Required by Nominatim
            }
        });

        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            return {
                ltd: parseFloat(location.lat), // 👇 Using 'ltd' to match your DB Schema
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error('Coordinate not found');
        }

    } catch (error) {
        console.error("Geocoding Error:", error.message);
        throw error;
    }
};

export const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {
        // Step 1: Get coordinates for both locations
        const start = await getAddressCoordinate(origin);
        const end = await getAddressCoordinate(destination);

        // Step 2: Call OSRM API (Free & Open Source)
        // Note: OSRM expects "Lng,Lat" (Longitude first!)
        const url = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.ltd};${end.lng},${end.ltd}?overview=false`;

        const response = await axios.get(url);

        if (response.data.code === 'Ok') {
            const route = response.data.routes[0];
            return {
                distance: {
                    text: (route.distance / 1000).toFixed(1) + " km",
                    value: route.distance // in meters
                },
                duration: {
                    text: Math.round(route.duration / 60) + " min",
                    value: route.duration // in seconds
                }
            };
        } else {
            throw new Error('Unable to fetch routes');
        }

    } catch (err) {
        console.error("Distance Error:", err.message);
        throw err;
    }
};

export const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=5`;

    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'InstaCab-App/1.0' }
        });

        return response.data.map(result => result.display_name);

    } catch (err) {
        console.error("Autocomplete Error:", err.message);
        throw err;
    }
};

export const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // This queries YOUR database, so it works with Google OR OpenStreetMap
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ 
                    [ lng, ltd ], // ⚠️ CRITICAL: MongoDB expects [Longitude, Latitude]
                    radius / 6371 // Radius in Radians (Earth radius = 6371km)
                ]
            }
        }
    });

    return captains;
}


// ====================================================================
// 🛑 GOOGLE MAPS SERVICES (PAID - COMMENTED OUT)
// ====================================================================

/*
export const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}
*/