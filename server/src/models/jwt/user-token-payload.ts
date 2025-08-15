import { JwtPayload } from 'jsonwebtoken';

export interface UserTokenPayload extends JwtPayload {
    username: string;
    id: string;
    publicKey: string;
}
