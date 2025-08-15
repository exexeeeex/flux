import type { Chat } from '@/entities/chat';
import { create } from 'zustand';
import { chatGetApi } from '../api';

interface ChatStoreState {
    chats: Chat[] | null;
    error: string | null;
    getChats: () => Promise<void>;
}

const { getChatsByUserId } = chatGetApi;

export const useChatStore = create<ChatStoreState>((set) => ({
    chats: null,
    error: null,
    getChats: async () => {
        set({ error: null });
        try {
            const data = await getChatsByUserId();
            set({ chats: data });
        } catch (error) {
            set({ error: 'Ошибка получения чатов' });
        }
    },
}));
