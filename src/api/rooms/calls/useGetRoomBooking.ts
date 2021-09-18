/* on pourrait avoir besoin de la variable non utilisée si on voulait avoir accès à d'autres salles*/
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';

import { IRoomBookingFront } from '../../../types/components/pages/room/IRoomBooking';
import { mapBookingBackToFront } from '../helpers/roomMappers';
import { useRoomApi } from '../useRoomsApi';


export const useGetRoomBooking = (_roomId?: string) => {
    const [bookings, setBookings] = useState<IRoomBookingFront[]>();
    const { getBooking, resetBooking } = useRoomApi();

    const handleGetBooking = useCallback(() => getBooking().then((response) => {
        setBookings(mapBookingBackToFront(response));
    })
        .catch((error) => {
            // 'TODO' log
        }),
    [getBooking]);

    useEffect(() => {
        handleGetBooking();
    }, [handleGetBooking]);

    const handleResetBooking = useCallback(
        () => {
            resetBooking().then(() => {
                handleGetBooking();
            });
        },
        [resetBooking, handleGetBooking],
    );

    return {
        bookings,
        handleResetBooking,
    };
};
