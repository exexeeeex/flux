import bcrypt from 'bcrypt';

export const hashPassword = async (
    password: string,
): Promise<{ hash: string; salt: string }> => {
    try {
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return { hash, salt };
    } catch {
        throw new Error('Password hashing failed');
    }
};
