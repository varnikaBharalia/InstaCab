import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // 👇 Fixed: Must match the model name 'user' (lowercase)
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain', // 👇 Fixed: Must match the model name 'captain' (lowercase)
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number, // in seconds
    },
    distance: {
        type: Number, // in meters
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false,
        required: true,
    }
});

const rideModel = mongoose.model('ride', rideSchema);

export default rideModel;