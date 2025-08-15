import type { TokensPair } from '@/entities/auth';
import { api } from './_base';

const updateTokens = async (token: string): Promise<TokensPair> => {
    const response = await api.get(`update-tokens/${token}`);
    return response.data;
};

export const getAuthenticationApi = {
    updateTokens,
};
