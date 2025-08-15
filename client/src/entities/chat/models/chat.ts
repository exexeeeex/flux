import type { User } from "@/entities/user";

export interface Chat {
	id: string;
	recipient: User;
}
