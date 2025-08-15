import { User } from '@prisma/client';

export interface ChatResponse {
    id: string;
    recipient: User;
}
