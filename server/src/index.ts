import { useExpressServer } from 'routing-controllers';
import { initializeWebSocket } from './websocket';
import 'reflect-metadata';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import dotenv from 'dotenv';
import log4js from 'log4js';
import express, { Express } from 'express';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

const port = process.env.PORT;

const app: Express = express();

app.use(httpContext.middleware);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
);

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

useExpressServer(app, {
    routePrefix: '/api',
});

app.get('/test', async (req, res) => {
    res.json({ message: 'Hello!' });
});

app.listen(port, () =>
    console.log(`E2EE Server running on ${port} port\n
    DB URL: ${process.env.DATABASE_URL}`),
);

initializeWebSocket();
