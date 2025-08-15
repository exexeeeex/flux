import { Router } from 'express';
import { chatController } from '../controllers/chat/chat';

const router = Router();

const { getAllChats } = chatController;

router.get('/get-all-chats/:chatId', getAllChats);

export default router;
