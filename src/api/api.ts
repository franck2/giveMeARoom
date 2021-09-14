/* eslint-disable no-process-env */
import { useState } from 'react';

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
    const [client] = useState(new ApiClient(getAxiosInstance(
        apiOptions,
        dispatchAuth,
        auth?.token,
    )));


    return {
        client,
    };
};
