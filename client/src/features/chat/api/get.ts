import { useAuthenticationStore } from '@/features/auth/store/auth';
import { jwtUtils } from '@/shared/lib/jwt';
import type { Chat } from '@/entities/chat';
import { api } from '@/shared/lib/api';

const { decodeToken } = jwtUtils;
const token = useAuthenticationStore.getState().accessToken;

const getChatsByUserId = async (): Promise<Chat[]> => {
    const { id } = decodeToken(token!);
    const response = await api.get(`chat/get-all-chats/${id}`);
    return response.data;
};

export const chatGetApi = {
    getChatsByUserId,
};
