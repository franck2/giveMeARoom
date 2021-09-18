/* eslint-disable no-process-env */
import { useCallback, useEffect, useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import { useAuthContext } from '../providers/AuthProvider';
import { ILoginResultApi } from '../types/api/ILoginResultApi';
import { IResultApi } from '../types/api/IResultApi';
import { AuthActionEnum } from '../types/providers/auth/AuthActionEnum';
import { ApiClient } from './client/ApiClient';
import { getTokenApi } from './login/helpers/apiLoginContants';


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

    const responseErrorInterceptor = useCallback(async (error) => {
        if (error.response.status === 401) {
            const originalRequest: AxiosRequestConfig & {_retry?: boolean} = error.config;

            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true;

            try {
                const resultNewLogin = await axios.create(apiOptions).get<IResultApi<ILoginResultApi>>(
                    getTokenApi,
                );

                const { token } = resultNewLogin.data.data;

                // eslint-disable-next-line no-underscore-dangle
                if (originalRequest._retry && resultNewLogin.data.success) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;

                    dispatchAuth({
                        auth: {
                            token,
                        },
                        type: AuthActionEnum.UPDATE_TOKEN,
                    });

                    return axios(originalRequest);
                }
            } catch (err) {
                return Promise.reject(err);
            }

            // use this to logout the user
            /*
            dispatchAuth({
                type: AuthActionEnum.HAS_TO_LOG,
                auth: {
                    token: '',
                },
            });

            */
        }

        return Promise.reject(error);
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
