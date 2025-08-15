import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CryptoStoreState {
    ciphertext: number[] | null;
    iv: number[] | null;
    salt: number[] | null;
    setItem: (ciphertext: number[], iv: number[], salt: number[]) => void;
}

export const useCryptoStore = create<CryptoStoreState>()(
    persist(
        (set) => ({
            ciphertext: null,
            iv: null,
            salt: null,
            setItem: (ciphertext: number[], iv: number[], salt: number[]) => {
                set({
                    ciphertext: ciphertext,
                    iv: iv,
                    salt: salt,
                });
            },
        }),
        {
            name: 'crypto-storage',
            storage: {
                getItem: (name: string) => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    return JSON.parse(str);
                },
                setItem: (name: string, value: any) =>
                    localStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name: string) => localStorage.removeItem(name),
            },
        },
    ),
);
