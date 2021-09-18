import { useCallback } from 'react';

import { IResultApi } from '../../types/api/IResultApi';
import { IRoomBookingBack } from '../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../types/components/pages/room/IRoomDetails';
import { useClientApi } from '../api';
import { getBookingsApi, getResetBooking, getResourceApi } from './helpers/apiLoginContants';

export const useRoomApi = () => {
    const { client } = useClientApi();

    const getResource = useCallback(() => client.get<IResultApi<IRoomDetails>>(getResourceApi)
        .then((response) => response.data.data), [client]);

    const getBooking = useCallback(() => client.get<IResultApi<IRoomBookingBack[]>>(getBookingsApi)
        .then((response) => response.data.data), [client]);


    const resetBooking = useCallback(() => client.get<IResultApi<null>>(getResetBooking)
        .then((response) => response.data.data), [client]);

    return {
        getResource,
        getBooking,
        resetBooking,
    };
};
