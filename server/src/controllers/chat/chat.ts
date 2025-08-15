import { Request, Response } from 'express';
import { ChatService } from '../../services';
import { errorLogger } from '../../config/logger/logger';
import { authenticationMiddleware } from '../../middleware/auth';
import { jwtUtils } from '../../utils/jwt';
import { UserTokenPayload } from '../../models';

const chatService = new ChatService();
const { decodeToken } = jwtUtils;

const getAllChats = [
    authenticationMiddleware,
    async (req: Request<{ chatId: string }>, res: Response) => {
        try {
            const { chatId } = req.params;
            const userId = decodeToken(
                req.headers.authorization.split(' ')[1],
            ) as UserTokenPayload;

            if (userId.id !== chatId) {
                return res.status(403).json({ error: 'Access denied' });
            }

            const response = await chatService.getAllChatsByUserId(chatId);
            res.status(200).json(response);
        } catch (error) {
            errorLogger.error(`Ошибка при получении чатов: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    },
];

export const chatController = {
    getAllChats,
};
