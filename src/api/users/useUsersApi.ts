import { useCallback } from 'react';

import { IResultApi } from '../../types/api/IResultApi';
import { IUserResultApi } from '../../types/api/IUserResultApi';
import { useClientApi } from '../api';
import { getMeApi, getUserApi } from './helpers/apiUsersConstants';

export const useUsersApi = () => {
    const { client } = useClientApi();

    const getUser = useCallback((idUser: string) => client.get<IResultApi<IUserResultApi>>(`${getUserApi}/${idUser}`)
        .then((response) => response.data.data), [client]);

    const getMe = useCallback(() => client.get<IResultApi<IUserResultApi>>(`${getMeApi}`)
        .then((response) => response.data.data), [client]);

    return {
        getUser,
        getMe,
    };
};
