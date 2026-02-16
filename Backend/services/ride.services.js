import rideModel from '../models/ride.model.js';
import { getDistanceTime } from './maps.service.js';
import crypto from 'crypto';

// 1. Helper function to calculate fare rates
export const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorbike: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorbike: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorbike: 1
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorbike: Math.round(baseFare.motorbike + ((distanceTime.distance.value / 1000) * perKmRate.motorbike) + ((distanceTime.duration.value / 60) * perMinuteRate.motorbike))
    };

    return fare;
};

// 2. Helper to generate a random OTP (Optional but recommended)
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

// 3. Main function to create a ride
export const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Calculate details first
    const fare = await getFare(pickup, destination);

    // Create the ride in DB
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        // otp: getOtp(6),
        fare: fare[vehicleType] // Pick the fare for the specific vehicle type (auto/car/motorbike)
    });

    return ride;
};