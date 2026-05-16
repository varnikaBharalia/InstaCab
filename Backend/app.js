import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/connect.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import captainRoutes from './routes/captain.routes.js';
import mapsRoutes from './routes/maps.routes.js';
import rideRoutes from './routes/rides.routes.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();
connectToDB();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// 🔥 The Foolproof Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'InstaCab API',
            version: '1.0.0',
            description: 'API documentation for the InstaCab ride-sharing platform',
        },
        servers: [
            { url: 'http://localhost:4000' } 
        ],
        // We define the paths here using standard Javascript! No spacing rules apply.
        paths: {
            '/users/register': {
                post: {
                    summary: 'Register a new user',
                    tags: ['Users'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        fullname: {
                                            type: 'object',
                                            properties: {
                                                firstname: { type: 'string', example: 'John' },
                                                lastname: { type: 'string', example: 'Doe' }
                                            }
                                        },
                                        email: { type: 'string', example: 'john@example.com' },
                                        password: { type: 'string', example: 'SecretPass123' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': { description: 'User successfully registered' },
                        '400': { description: 'Validation error or User already exists' }
                    }
                }
            }
        }
    },
    apis: [], // Leave this empty now, we don't need to read comments anymore!
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

export default app;