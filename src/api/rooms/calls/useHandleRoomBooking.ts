/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';

import { millisecondsInMinute } from 'date-fns';

import { useLogManager } from '../../../tools/logger/useLogManager';
import { useTranslateBooking } from '../../../translate/hooks/useTranslateBooking';
import { useTranslateCommon } from '../../../translate/hooks/useTranslateCommon';
import { TranslateBookingKeys } from '../../../translate/keys/TranslateBookingKeys';
import { TranslateCommonKeys } from '../../../translate/keys/TranslateCommonKeys';
import { IRoomBookingFront } from '../../../types/components/pages/room/IRoomBooking';
import { mapBookingBackToFront } from '../helpers/roomMappers';
import { useRoomApi } from '../useRoomsApi';
import { refreshEveryNMinutes } from './helpers/roomCallConstants';


export const useHandleRoomBooking = (_roomId?: string) => {
    const [bookings, setBookings] = useState<IRoomBookingFront[]>();
    const { getBooking, resetBooking, deleteBooking } = useRoomApi();
    const { logError, logSuccess } = useLogManager();
    const { translateCommon } = useTranslateCommon();
    const { translateBooking } = useTranslateBooking();

    const handleGetBooking = useCallback(() => {
        getBooking().then((response) => {
            setBookings(mapBookingBackToFront(response));
        })
            .catch((error) => {
                logError(translateCommon(TranslateCommonKeys.errorWS), error);
            });
    },
    [getBooking, translateCommon, logError]);

    useEffect(() => {
        handleGetBooking();
    }, [handleGetBooking]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleGetBooking();
        }, millisecondsInMinute * refreshEveryNMinutes);

        return () => clearTimeout(timer);
    }, [bookings, handleGetBooking]);

    const handleResetBooking = useCallback(() => {
        resetBooking().then(() => {
            handleGetBooking();
        });
    },
    [resetBooking, handleGetBooking]);

    const handleDeleteBooking = useCallback(
        (bookingId: string) => {
            deleteBooking(bookingId).then(() => {
                handleGetBooking();
                logSuccess(translateBooking(TranslateBookingKeys.bookingDeleted));
            })
                .catch((error) => {
                    logError(translateCommon(TranslateCommonKeys.errorWS), error);
                });
        },
        [logSuccess, logError, translateCommon, translateBooking, deleteBooking, handleGetBooking],
    );

    return {
        bookings,
        handleResetBooking,
        handleGetBooking,
        handleDeleteBooking,
    };
};
