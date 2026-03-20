import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";
import jwt from "jsonwebtoken"; // Ensure you import JWT
import rideModel from './models/ride.model.js';
import { getAddressCoordinate, getCaptainsInTheRadius } from './services/maps.services.js';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    // 1. MIDDLEWARE: Authenticate Socket BEFORE connection
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token || socket.handshake.headers.token;

            if (!token) {
                return next(new Error('Authentication error'));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded._id) || await captainModel.findById(decoded._id);

            if (!user) {
                return next(new Error('Authentication error'));
            }

            // Attach user to socket object
            socket.user = user;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', async (socket) => {
        console.log(`New client connected: ${socket.id}`);

        // 2. AUTOMATIC JOIN: Update DB immediately using the authenticated user
        if (socket.user) {
            // Determine if it's a User or Captain based on the schema or model checks
            // Or simpler: Try updating both (inefficient) or check a type field if you have one.
            // Since we fetched the user in middleware, we can check instance:

            if (socket.user.email && !socket.user.vehicle) { // Simple check for User
                await userModel.findByIdAndUpdate(socket.user._id, { socketId: socket.id });
            }
            else if (socket.user.vehicle) { // Check for Captain
                await captainModel.findByIdAndUpdate(socket.user._id, {
                    socketId: socket.id,
                    status: 'active'  // ----------------------->>>>>>
                });
                console.log("🚖 Captain is now ACTIVE:", socket.user._id);

            }
        }


        // ✅ ADD THIS (VERY IMPORTANT 🔥)
        socket.on('join', async ({ userId, userType }) => {
            console.log(`🔗 ${userType} joined: ${userId}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });
            }

            if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id,
                    status: 'active'   // ✅ ALSO HERE
                });
            }
        });


        socket.on('update-location-captain', async (data) => {

            console.log("📍 Location update:", data);   // 🔥 ADD THIS


            const { userId, location } = data;

            // Security: Ensure the socket is updating their own location
            if (socket.user._id.toString() !== userId) {
                return socket.emit('error', { message: 'Unauthorized location update' });
            }

            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    type: "Point",
                    coordinates: [location.lng, location.lat]
                }
            });


            // ✅ NEW: notify captain of any pending nearby rides
            try {
                const captain = await captainModel.findById(userId);
                const pendingRides = await rideModel.find({ status: 'pending' }).populate('user').select('+otp');

                for (const ride of pendingRides) {
                    const pickupCoords = await getAddressCoordinate(ride.pickup);
                    const nearbyCaptains = await getCaptainsInTheRadius(
                        pickupCoords.lat,
                        pickupCoords.lng,
                        2
                    );

                    const isNearby = nearbyCaptains.some(c => c._id.toString() === userId);
                    const isRightVehicle = captain.vehicle.vehicleType === ride.vehicleType;

                    if (isNearby && isRightVehicle) {
                        socket.emit('new-ride', ride);
                        console.log(`🔔 Notified captain ${userId} of pending ride ${ride._id}`);
                    }
                }
            } catch (err) {
                console.error('Error checking pending rides:', err);
            }

        });



        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);

            // ✅ OPTIONAL: mark captain inactive on disconnect
            if (socket.user?.vehicle) {
                await captainModel.findByIdAndUpdate(socket.user._id, {
                    status: 'inactive'
                });
            }
        });
    });
};

export const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}