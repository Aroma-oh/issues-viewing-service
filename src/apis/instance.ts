import axios from 'axios';
import {BASE_RUL} from 'constants/apis';

export const instance = axios.create({
    baseURL: BASE_RUL,
    headers: {
        Accept: 'application/vnd.github+json',
    },
});

instance.interceptors.request.use(
    config => {
        const GH_TOKEN = process.env.REACT_APP_GH_TOKEN;

        if (GH_TOKEN) config.headers.Authorization = `Bearer ${GH_TOKEN}`;
        return config;
    },
    error => {
        return error;
    }
);
