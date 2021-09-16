/* eslint-disable no-process-env */
import { useCallback, useEffect, useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import { useAuthContext } from '../providers/AuthProvider';
import { AuthActionEnum } from '../types/providers/auth/AuthActionEnum';
import { ApiClient } from './client/ApiClient';


const EnvironementConfiguration = require('./client/config.json');

const { api } = EnvironementConfiguration[`${process.env.REACT_APP_ENV}`];

const apiOptions: AxiosRequestConfig = {
    baseURL: api.endPoint,
};


export const useClientApi = () => {
    const { auth } = useAuthContext();
    const { dispatchAuth } = useAuthContext();

    const [client] = useState(new ApiClient(axios.create(apiOptions)));

    const requestInterceptor = useCallback((interceptor) => {
        if (auth?.token) {
            interceptor.headers.Authorization = `Bearer ${auth?.token}`;
        }

        return interceptor;
    }, [auth?.token]);

    const responseErrorInterceptor = useCallback((error) => {
        if (error.response.status === 401) {
            dispatchAuth({
                type: AuthActionEnum.HAS_TO_LOG,
                auth: {
                    token: '',
                },
            });
        }
    }, [dispatchAuth]);

    useEffect(() => {
        const request = client.client.interceptors.request.use(requestInterceptor, Promise.reject);
        const response = client.client.interceptors.response.use((resp) => resp, responseErrorInterceptor);

        return () => {
            client.client.interceptors.request.eject(request);
            client.client.interceptors.response.eject(response);
        };
    }, [client, requestInterceptor, responseErrorInterceptor]);


    return {
        client,
    };
};
