import { bufferUtils } from '../buffer';

const { stringToArrayBuffer, arrayBufferToArray } = bufferUtils;

const encryptPrivateKey = async (privateKey: CryptoKey, password: string) => {
    try {
        const rawPrivateKey = await crypto.subtle.exportKey(
            'pkcs8',
            privateKey,
        );
        console.log(
            'Raw private key (pkcs8):',
            arrayBufferToArray(rawPrivateKey),
        );

        const passwordKey = await crypto.subtle.importKey(
            'raw',
            stringToArrayBuffer(password),
            { name: 'PBKDF2' },
            false,
            ['deriveKey'],
        );

        const salt = crypto.getRandomValues(new Uint8Array(16));
        const derivedKey = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt,
                iterations: 100000,
                hash: 'SHA-256',
            },
            passwordKey,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt'],
        );

        const iv = crypto.getRandomValues(new Uint8Array(12));
        const ciphertext = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            derivedKey,
            rawPrivateKey,
        );

        return {
            ciphertext: arrayBufferToArray(ciphertext),
            iv: arrayBufferToArray(iv),
            salt: arrayBufferToArray(salt),
        };
    } catch (error: any) {
        console.error('Ошибка в encryptPrivateKey:', error.message);
        throw new Error(`Failed to encrypt private key: ${error.message}`);
    }
};

export const encryptorUtils = {
    encryptPrivateKey,
};
