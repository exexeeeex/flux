import { ChatResponse } from '../../models';

export interface IChatService {
    getAllChatsByUserId(userId: string): Promise<ChatResponse[]>;
}
