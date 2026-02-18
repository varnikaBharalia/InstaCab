import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";
import jwt from "jsonwebtoken"; // Ensure you import JWT

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
            } else if (socket.user.vehicle) { // Check for Captain
                await captainModel.findByIdAndUpdate(socket.user._id, { socketId: socket.id });
            }
        }

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            // Security: Ensure the socket is updating their own location
            if(socket.user._id.toString() !== userId) {
                 return socket.emit('error', { message: 'Unauthorized location update' });
            }

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: [location.lng, location.ltd] 
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
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