
import { Dispatch } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import { AuthActionEnum } from '../../types/providers/auth/AuthActionEnum';
import { IAuthAction } from '../../types/providers/auth/IAuthAction';


export const getAxiosInstance = (
    apiOptions: AxiosRequestConfig,
    dispatchAuth: Dispatch<IAuthAction>,
    token?: string,
) => {
    const newService = axios.create(apiOptions);

    newService.interceptors.request.use(
        (interceptor) => {
            if (token) {
                interceptor.headers.Authorization = `Bearer ${token}`;
            }

            return interceptor;
        },
        (error) => Promise.reject(error),
    );

    newService.interceptors.response.use(((response) => response),
        (error) => {
            if (error.response.status === 401) {
                dispatchAuth({
                    type: AuthActionEnum.HAS_TO_LOG,
                    auth: {
                        token: '',
                    },
                });
            }
        });

    return (newService);
};
