import { Request, Response } from 'express';
import { AuthenticationService } from '../../services';
import { Sign } from '../../models';
import { errorLogger } from '../../config/logger/logger';

const authService = new AuthenticationService();

const signUp = async (req: Request<{}, {}, Sign>, res: Response) => {
    try {
        await authService.signUp(req.body);
        res.status(200).json({ message: 'Регистрация прошла успешно!' });
    } catch (error) {
        errorLogger.error(`Ошибка при регистрации: ${error}`);
        res.status(400).json({ error: error.message });
    }
};

const signIn = async (req: Request<{}, {}, Sign>, res: Response) => {
    try {
        const response = await authService.signIn(req.body);
        res.status(200).json(response);
    } catch (error) {
        errorLogger.error(`Ошибка при авторизации в аккаунт: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

const updateTokens = async (req: Request<{ token: string }>, res: Response) => {
    try {
        const { token } = req.params;
        const response = await authService.updateTokens(token);
        res.status(200).json(response);
    } catch (error) {
        errorLogger.error(`Ошибка при обновлении токена: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

export const authController = {
    signUp,
    signIn,
    updateTokens,
};
