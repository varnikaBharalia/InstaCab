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

// Enable CORS for the frontend and allow cookies/credentials
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
	origin: FRONTEND_URL,
	credentials: true
}));

// Ensure preflight responses also use the same CORS settings
// app.options('*', cors({ origin: FRONTEND_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

export default app;