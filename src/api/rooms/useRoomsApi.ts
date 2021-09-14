import { useCallback } from 'react';

import { IResultApi } from '../../types/api/IResultApi';
import { IRoomDetails } from '../../types/components/pages/room/IRoomDetails';
import { useClientApi } from '../api';
import { getResourceApi } from './apiLoginContants';

export const useResourceApi = () => {
    const { client } = useClientApi();

    const getResource = useCallback(() => client.get<IResultApi<IRoomDetails>>(getResourceApi)
        .then((response) => response.data.data), [client]);

    return {
        getResource,
    };
};
