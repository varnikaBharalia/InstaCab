import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/connect.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import captainRoutes from './routes/captain.routes.js';
import mapsRoutes from './routes/maps.routes.js';
import rideRoutes from './routes/rides.routes.js';

dotenv.config();
connectToDB();

const app = express();

// Improved CORS for frontend connection
app.use(cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

export default app;