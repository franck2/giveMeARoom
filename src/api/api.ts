/* eslint-disable no-process-env */
import { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import { useAuthContext } from '../providers/AuthProvider';
import { ApiClient } from './client/ApiClient';
import { getAxiosInstance } from './client/useAxiosInstance';


const EnvironementConfiguration = require('./client/config.json');

const { api } = EnvironementConfiguration[`${process.env.REACT_APP_ENV}`];

const apiOptions: AxiosRequestConfig = {
    baseURL: api.endPoint,
};


export const useClientApi = () => {
    const { auth } = useAuthContext();
    const { dispatchAuth } = useAuthContext();
    const [client, setClient] = useState(new ApiClient(getAxiosInstance(
        apiOptions,
        dispatchAuth,
        auth?.token,
    )));

    useEffect(() => {
        setClient(new ApiClient(getAxiosInstance(apiOptions, dispatchAuth, auth?.token)));
    }, [auth?.token, dispatchAuth]);

    return {
        client,
    };
};
