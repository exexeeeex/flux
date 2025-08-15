import { Sign, TokensPair } from '../../models';

export interface IAuthenticationService {
    signUp(data: Sign): Promise<boolean>;
    signIn(data: Sign): Promise<TokensPair>;
    updateTokens(token: string): Promise<TokensPair>;
}
