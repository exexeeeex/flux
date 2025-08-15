import type { Sign, TokensPair } from '@/entities/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAuthenticationApi, postAuthenticationApi } from '../api';

const { signIn, signUp } = postAuthenticationApi;
const { updateTokens } = getAuthenticationApi;

interface AuthenticationStore {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    signIn: (model: Sign) => Promise<TokensPair>;
    signUp: (model: Sign) => Promise<void>;
    logout: () => void;
    refresh: () => Promise<void>;
}

export const useAuthenticationStore = create<AuthenticationStore>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            signIn: async (model: Sign) => {
                const tokens = await signIn(model);
                set({
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    isAuthenticated: true,
                });
                return tokens;
            },
            signUp: async (model: Sign) => {
                await signUp(model);
                const tokens = await signIn(model);
                set({
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    isAuthenticated: true,
                });
            },
            logout: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                }),
            refresh: async () => {
                const currentRefreshToken =
                    useAuthenticationStore.getState().refreshToken;
                if (!currentRefreshToken) throw new Error('Токен не найден!');
                const { accessToken, refreshToken } =
                    await updateTokens(currentRefreshToken);
                set({ accessToken, refreshToken, isAuthenticated: true });
            },
        }),
        {
            name: 'authentication-storage',
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    return JSON.parse(str);
                },
                setItem: (name, value) =>
                    localStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => localStorage.removeItem(name),
            },
        },
    ),
);
