import { useCallback } from 'react';

import { IBookingPost } from '../../types/api/IBookingPost';
import { IPostBookingResult } from '../../types/api/IPostBookingResult';
import { IResultApi } from '../../types/api/IResultApi';
import { IRoomBookingBack } from '../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../types/components/pages/room/IRoomDetails';
import { useClientApi } from '../api';
import { bookingsApi, getResetBooking, getResourceApi } from './helpers/apiLoginContants';

export const useRoomApi = () => {
    const { client } = useClientApi();

    const getResource = useCallback(() => client.get<IResultApi<IRoomDetails>>(getResourceApi)
        .then((response) => response.data.data), [client]);

    const getBooking = useCallback(() => client.get<IResultApi<IRoomBookingBack[]>>(bookingsApi)
        .then((response) => response.data.data), [client]);


    const resetBooking = useCallback(() => client.get<IResultApi<null>>(getResetBooking)
        .then((response) => response.data.data), [client]);

    const postBooking = useCallback((params: IBookingPost) => client.post<IResultApi<IPostBookingResult>, IBookingPost>(
        bookingsApi, params,
    ).then((response) => response.data.data),
    [client]);


    return {
        getResource,
        getBooking,
        resetBooking,
        postBooking,
    };
};
