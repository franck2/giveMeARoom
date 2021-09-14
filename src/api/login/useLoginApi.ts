import { useCallback } from 'react';

import { ILoginResultApi } from '../../types/api/ILoginResultApi';
import { useClientApi } from '../api';
import { getTokenApi } from './apiLoginContants';

export const useLoginApi = () => {
    const { client } = useClientApi();

    const getToken = useCallback(() => client.get<ILoginResultApi>(getTokenApi)
        .then((response) => response.data), [client]);

    return {
        getToken,
    };
};
