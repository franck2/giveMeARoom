import { useCallback } from 'react';

import { ILoginResultApi } from '../../types/api/ILoginResultApi';
import { IResultApi } from '../../types/api/IResultApi';
import { useClientApi } from '../api';
import { getTokenApi } from './helpers/apiLoginContants';

export const useLoginApi = () => {
    const { client } = useClientApi();

    const getToken = useCallback(() => client.get<IResultApi<ILoginResultApi>>(getTokenApi)
        .then((response) => response.data.data), [client]);

    return {
        getToken,
    };
};
