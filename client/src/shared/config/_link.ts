const production = process.env.NODE_ENV === 'production';

const API_URL = production ? '' : 'http://localhost:5000/';
const FILESERVER_URL = production ? '' : 'https://localhost:80/';
const WS_URL = production ? '' : 'ws://localhost:5001/ws';

export const _linkCfg = {
    API_URL,
    FILESERVER_URL,
    WS_URL,
};
