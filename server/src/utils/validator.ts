import bcrypt from 'bcrypt';

const validatePassword = async (
    passwordHash: string,
    salt: string,
    password: string,
): Promise<boolean> => {
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword === passwordHash;
    } catch {
        throw {
            httpCode: 505,
            name: 'PasswordError',
            message: 'Указан неверный пароль!',
        };
    }
};

export const validatorUtils = {
    validatePassword,
};
