import { NextFunction, Request, Response } from 'express';
import { TokensPair } from '../models';
import jwt from 'jsonwebtoken';

const writeAccessToken = (username: string, id: string) =>
    jwt.sign(
        {
            username: username,
            id: id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '10m',
        },
    );

const writeRefreshToken = (username: string, id: string) =>
    jwt.sign(
        {
            username: username,
            id: id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1d',
        },
    );

const createTokenPair = (username: string, id: string): TokensPair => {
    try {
        return {
            accessToken: writeAccessToken(username, id),
            refreshToken: writeRefreshToken(username, id),
        };
    } catch (error) {
        throw new Error(error);
    }
};

const decodeToken = (token: string) => {
    return jwt.decode(token);
};

const validateToken = (
    token: string,
    tokenType: 'access' | 'refresh',
): boolean => {
    try {
        const secret =
            tokenType === 'refresh'
                ? process.env.REFRESH_TOKEN_SECRET
                : process.env.ACCESS_TOKEN_SECRET;

        if (!secret)
            throw new Error(
                `${tokenType.toUpperCase()}_TOKEN_SECRET is not defined`,
            );

        jwt.verify(token, secret);
        return true;
    } catch (error) {
        return false;
    }
};

export const jwtUtils = {
    createTokenPair,
    decodeToken,
    validateToken,
};
