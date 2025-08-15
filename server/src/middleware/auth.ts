import { NextFunction, Request, Response } from 'express';
import { jwtUtils } from '../utils/jwt';

const { validateToken } = jwtUtils;

export const authenticationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authenticationHeader = req.headers.authorization;

    if (authenticationHeader) {
        const token = authenticationHeader.split(' ')[1];

        if (!validateToken(token, 'access'))
            return res.status(403).json({ error: 'Invalid token!' });

        next();
    } else {
        res.status(401).json({ error: 'Authorization header is required' });
    }
};
