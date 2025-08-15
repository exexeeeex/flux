import { PrismaClient } from '@prisma/client';
import { IChatService } from 'src/interfaces';
import { ChatResponse } from 'src/models';

export class ChatService implements IChatService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllChatsByUserId(userId: string): Promise<ChatResponse[]> {
        const chats = await this.prisma.chat.findMany({
            where: {
                OR: [{ firstUserId: userId }, { secondUserId: userId }],
            },
            include: {
                user: true,
                secondUser: true,
            },
        });

        return chats.map((chat) => {
            const isCurrentUserFirst = chat.firstUserId === userId;
            const recipient = isCurrentUserFirst ? chat.secondUser : chat.user;

            return {
                id: chat.id,
                recipient: recipient,
            };
        });
    }
}
