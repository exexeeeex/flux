import { _linkCfg } from '@/shared/config';
import axios from 'axios';

const baseApiUrl = `${_linkCfg.API_URL}auth`;

export const api = axios.create({
    baseURL: baseApiUrl,
});
