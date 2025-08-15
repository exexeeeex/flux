import { PrismaClient } from '@prisma/client';
import { IAuthenticationService } from '../../interfaces';
import { injectable } from 'tsyringe';
import { Sign, TokensPair, UserTokenPayload } from '../../models';
import { hashPassword } from '../../utils/encryptor';
import { jwtUtils } from '../../utils/jwt';
import { validatorUtils } from '../../utils/validator';

const { createTokenPair, validateToken, decodeToken } = jwtUtils;

@injectable()
export class AuthenticationService implements IAuthenticationService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async signUp(data: Sign): Promise<boolean> {
        if (data.username.length <= 3 || data.password.length <= 3)
            throw {
                httpCode: 503,
                name: 'LengthError',
                message: 'Длина не может быть меньше трёх!',
            };

        const hasUser = await this.prisma.user.findUnique({
            where: { username: data.username },
        });
        if (hasUser)
            throw new Error('Пользователь с такой почтой уже существует!');

        const { hash, salt } = await hashPassword(data.password);

        const publicKeyBuffer = Buffer.from(new Uint8Array(data.publicKey));

        try {
            const { id } = await this.prisma.user.create({
                data: {
                    username: data.username.toLowerCase(),
                    passwordHash: hash,
                    passwordSalt: salt,
                    avatar: 'null',
                },
            });

            await this.prisma.userKey.create({
                data: {
                    userId: id,
                    publicKey: publicKeyBuffer,
                },
            });

            return true;
        } catch (error) {
            throw new Error(error);
        }
    }

    async signIn(data: Sign): Promise<TokensPair> {
        if (data.password.length <= 3 || data.username.length <= 3)
            throw {
                httpCode: 503,
                name: 'LengthError',
                message: 'Длина не может быть меньше трёх!',
            };

        const hasUser = await this.prisma.user.findUnique({
            where: { username: data.username },
        });

        if (!hasUser)
            throw {
                httpCode: 506,
                name: 'UsernameError',
                message:
                    'Проверьте правильность введённого имени пользователя!',
            };

        const userPublicKey = await this.prisma.userKey.findFirst({
            where: { userId: hasUser.id },
        });

        const { validatePassword } = validatorUtils;

        await validatePassword(
            hasUser.passwordHash,
            hasUser.passwordSalt,
            data.password,
        );

        return createTokenPair(data.username, hasUser.id);
    }

    async updateTokens(token: string): Promise<TokensPair> {
        const isTokenValide = validateToken(token, 'refresh');
        if (!isTokenValide)
            throw {
                httpCode: 506,
                name: 'TokenError',
                message: `Токен просрочился, сессия будет закрыта!`,
            };

        const decodedToken = decodeToken(token) as UserTokenPayload;

        console.log(decodedToken);

        const user = await this.prisma.user.findFirst({
            where: { id: decodedToken.id },
        });

        if (!user)
            throw {
                httpCode: 506,
                name: 'TokenError',
                message: `Токен сформирован неверно, сессия будет закрыта!`,
            };

        const userKey = await this.prisma.userKey.findFirst({
            where: { userId: user.id },
        });

        return createTokenPair(user.username, user.id);
    }
}
