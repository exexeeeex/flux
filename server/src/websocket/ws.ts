import { Server } from 'ws';
import { Notify, UserTokenPayload } from '../models';
import { errorLogger, logger } from '../config/logger/logger';
import jwt from 'jsonwebtoken';

const clients = new Map<string, any>();

export const initializeWebSocket = () => {
    const wss = new Server({ port: 5001, path: '/ws' });

    console.log(
        `WebSocket сервер запущен на ws://localhost:5001/ws\nВремя: ${Date.now()}`,
    );
    logger.info(
        `WebSocket сервер запущен на ws://localhost:5001/ws\nВремя: ${Date.now()}`,
    );

    wss.on('connection', (ws, req) => {
        if (!req.url.includes('token=')) {
            const errorMsg = 'Токен отсутствует. Подключение закрыто.';
            ws.send(
                JSON.stringify({
                    type: 'error',
                    message: errorMsg,
                }),
            );
            console.log(errorMsg);
            errorLogger.error(errorMsg);
            ws.close(4001, errorMsg);
            return;
        }
        const token = req.url.split('token=')[1];
        try {
            const decoded = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
            ) as UserTokenPayload;
            clients.set(decoded.username, ws);
            logger.info(
                `WS: Пользователь ${decoded.username}(${decoded.id}) подключился.`,
            );
            ws.on('close', () => {
                clients.delete(decoded.username);
                logger.info(
                    `WS: Пользователь ${decoded.username}(${decoded.id}) отключился.`,
                );
            });
        } catch (error) {
            console.error(error);
            logger.error(`WS: Ошибка при проверке токена: ${error}`);
            ws.close();
        }
    });

    return clients;
};

export const notifyRecipient = (model: Notify) => {
    const ws = clients.get(model.recipientId);
    if (ws) {
        ws.send(JSON.stringify(model.message));
    }
};
