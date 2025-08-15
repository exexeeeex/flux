import { useAuthenticationStore } from '@/features/auth/store/auth';
import { _linkCfg } from '@/shared/config';
import axios from 'axios';

const { API_URL } = _linkCfg;

export const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthenticationStore.getState();
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            (error.response?.status == 401 && !originalRequest._retry) ||
            error.response?.status == 403
        ) {
            originalRequest._retry = true;
            try {
                const { refresh } = useAuthenticationStore.getState();
                await refresh();
                const newToken = useAuthenticationStore.getState().accessToken;
                if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                useAuthenticationStore.getState().logout();
                window.location.reload();
                alert('Сессия истекла!');
            }
        }
        return Promise.reject(error);
    },
);
