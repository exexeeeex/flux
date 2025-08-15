import { _linkCfg } from '@/shared/config';
import { api } from '@/shared/lib/api';

const { API_URL } = _linkCfg;

const baseApiUrl = `${API_URL}chat`;

export const request = api.create({
    baseURL: baseApiUrl,
});
