/* on pourrait avoir besoin de la variable non utilisée si on voulait avoir accès à d'autres salles*/
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';

import { millisecondsInMinute } from 'date-fns';

import { IRoomBookingFront } from '../../../types/components/pages/room/IRoomBooking';
import { mapBookingBackToFront } from '../helpers/roomMappers';
import { useRoomApi } from '../useRoomsApi';
import { refreshEveryNMinutes } from './helpers/roomCallConstants';


export const useHandleRoomBooking = (_roomId?: string) => {
    const [bookings, setBookings] = useState<IRoomBookingFront[]>();
    const { getBooking, resetBooking, deleteBooking } = useRoomApi();

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

    useEffect(() => {
        const timer = setTimeout(() => {
            handleGetBooking();
        }, millisecondsInMinute * refreshEveryNMinutes);

        return () => clearTimeout(timer);
    }, [bookings, handleGetBooking]);

    const handleResetBooking = useCallback(
        () => {
            resetBooking().then(() => {
                handleGetBooking();
            });
        },
        [resetBooking, handleGetBooking],
    );

    const handleDeleteBooking = useCallback(
        (bookingId: string) => {
            deleteBooking(bookingId).then(() => {
                handleGetBooking();
            });
        },
        [deleteBooking, handleGetBooking],
    );

    return {
        bookings,
        handleResetBooking,
        handleGetBooking,
        handleDeleteBooking,
    };
};
