import type { Sign, TokensPair } from '@/entities/auth';
import { api } from './_base';
import { encryptorUtils } from '@/shared/lib/encryptor';
import { bufferUtils } from '@/shared/lib/buffer';
import { useCryptoStore } from '@/features/crypto';

const { encryptPrivateKey } = encryptorUtils;
const { arrayBufferToArray } = bufferUtils;

const signIn = async (model: Sign): Promise<TokensPair> => {
    const response = await api.post<TokensPair>('sign-in', model);
    return response.data;
};

const signUp = async (model: Sign): Promise<void> => {
    const { setItem } = useCryptoStore.getState();
    const keypair = await crypto.subtle.generateKey(
        { name: 'ECDH', namedCurve: 'P-256' },
        true,
        ['deriveKey'],
    );
    const publicKeyRaw = await crypto.subtle.exportKey(
        'raw',
        keypair.publicKey,
    );
    const { ciphertext, iv, salt } = await encryptPrivateKey(
        keypair.privateKey,
        model.password,
    );

    setItem(ciphertext, iv, salt);
    await api.post('sign-up', {
        username: model.username,
        password: model.password,
        publicKey: arrayBufferToArray(publicKeyRaw),
    });
};

export const postAuthenticationApi = {
    signIn,
    signUp,
};
