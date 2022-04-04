import express, { Application } from 'express';
import morgan from 'morgan';

import AuthController from './routes/auth.routes'
import VueloController from './routes/vuelo.routes'

const app: Application = express();

// Settings
app.set('port', 3000 || process.env.PORT);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use(AuthController);
app.use('/vuelos', VueloController);

export default app;
