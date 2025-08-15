import { type AuthenticationContextType } from '@/entities/auth/models';
import {
    createContext,
    useContext,
    useEffect,
    type FC,
    type ReactNode,
} from 'react';
import { useAuthenticationStore } from '../store/auth';
import axios from 'axios';

const AuthenticationContext = createContext<
    AuthenticationContextType | undefined
>(undefined);

export const AuthenticationProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { accessToken, refresh, isAuthenticated } = useAuthenticationStore();

    useEffect(() => {
        const state = useAuthenticationStore.getState();
        if (!state) refresh();
    }, []);

    useEffect(() => {
        const interceptors = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status == 401 && !error.config._retry) {
                    error.config._retry = true;
                    try {
                        await refresh();
                        const newAccessToken =
                            useAuthenticationStore.getState().accessToken;
                        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axios(error.config);
                    } catch (refreshError) {
                        useAuthenticationStore.getState().logout();
                        return Promise.resolve(refreshError);
                    }
                }
                return Promise.reject(error);
            },
        );

        return () => axios.interceptors.response.eject(interceptors);
    }, [refresh]);

    return (
        <AuthenticationContext.Provider
            value={{ isAuthenticated, accessToken }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthenticationContext = () => {
    const context = useContext(AuthenticationContext);
    if (!context)
        throw new Error(
            `useAuthenticationContext must be used within an AuthenticationProvider`,
        );
    return context;
};
