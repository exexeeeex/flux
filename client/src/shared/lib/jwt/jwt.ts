import type { UserPayload } from '@/entities/jwt';
import { jwtDecode } from 'jwt-decode';

const decodeToken = (token: string) => {
    return jwtDecode(token) as UserPayload;
};

export const jwtUtils = {
    decodeToken,
};
