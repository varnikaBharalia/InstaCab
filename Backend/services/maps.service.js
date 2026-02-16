// ------------------------------google map code ------------

// import axios from 'axios';

// export const getAddressCoordinate = async (address) => {
//     // 1. Matches the name in your .env file exactly
//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);

//         if (response.data.status === 'OK') {
//             const location = response.data.results[0].geometry.location;
//             return {
//                 lat: location.lat,
//                 lng: location.lng
//             };
//         } else {
//             throw new Error(`Google API Error: ${response.data.status}`);
//         }
//     } catch (error) {
//         console.error("Geocoding Error:", error.message);
//         throw error;
//     }
// };


// export const getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) {
//         throw new Error('Origin and destination are required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;
    
//     // Google Maps Distance Matrix API endpoint
//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);

//         if (response.data.status === 'OK') {
            
//             // Check if the route was actually found
//             if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
//                 throw new Error('No routes found');
//             }

//             // Returns an object with distance and duration
//             return response.data.rows[0].elements[0];
//         } else {
//             throw new Error('Unable to fetch distance and time');
//         }

//     } catch (err) {
//         console.error("Distance Matrix Error:", err.message);
//         throw err;
//     }
// };

// export const getAutoCompleteSuggestions = async (input) => {
//     if (!input) {
//         throw new Error('query is required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);

//         if (response.data.status === 'OK') {
//             return response.data.predictions;
//         } else {
//             throw new Error('Unable to fetch suggestions');
//         }
//     } catch (err) {
//         console.error("Autocomplete Error:", err.message);
//         throw err;
//     }
// };


import axios from 'axios';

export const getAddressCoordinate = async (address) => {
    // 1. URL for OpenStreetMap (Nominatim) - No API Key needed
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {

        // 👇 DEBUG: This prints the URL to your terminal. Click it to test in browser!
        console.log(" Searching URL::::::", url);
        // 2. Nominatim requires a User-Agent header to prevent blocking
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'InstaCab-App/1.0' 
            }
        });

        // 3. Check if we got results (Nominatim returns an array)
        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: parseFloat(location.lat), // Convert string to number
                lng: parseFloat(location.lon)  // Nominatim uses 'lon', not 'lng'
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
        const url = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false`;

        const response = await axios.get(url);

        if (response.data.code === 'Ok') {
            const route = response.data.routes[0];
            
            return {
                distance: { 
                    text: (route.distance / 1000).toFixed(1) + " km", 
                    value: route.distance // Returns in meters
                },
                duration: { 
                    text: Math.round(route.duration / 60) + " min", 
                    value: route.duration // Returns in seconds
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

    const apiKey = process.env.GOOGLE_MAPS_API;
    // 1. Use OpenStreetMap Nominatim API (Free)
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=5`;

    try {
        const response = await axios.get(url, {
            headers: {
                // REQUIRED: Nominatim blocks requests without a valid User-Agent
                'User-Agent': 'InstaCab-App/1.0' 
            }
        });

        // 2. Map the results to a simple array of strings
        return response.data.map(result => result.display_name);

    } catch (err) {
        console.error("Autocomplete Error:", err.message);
        throw err;
    }
};