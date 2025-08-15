import type { Chat } from "./chat";

export interface ChatCardProp {
	chat: Chat;
	select: () => void;
}
