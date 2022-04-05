import express, { Application } from 'express';
import morgan from 'morgan';

import AuthController from './routes/auth.routes';
import VueloController from './routes/vuelo.routes';
import BaggageController from './routes/baggage.routes';
import ProfileController from './routes/profile.routes';
import CommentController from './routes/comment.routes';

const app: Application = express();

// Settings
app.set('port', 3000 || process.env.PORT);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/auth', AuthController);
app.use('/vuelos', VueloController);
app.use('/baggage', BaggageController);
app.use('/profile', ProfileController);
app.use('/comment', CommentController);

export default app;
