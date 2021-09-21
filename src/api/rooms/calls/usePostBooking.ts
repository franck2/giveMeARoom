import { useCallback } from 'react';

import { useLogManager } from '../../../tools/logger/useLogManager';
import { useTranslateBooking } from '../../../translate/hooks/useTranslateBooking';
import { useTranslateCommon } from '../../../translate/hooks/useTranslateCommon';
import { TranslateBookingKeys } from '../../../translate/keys/TranslateBookingKeys';
import { TranslateCommonKeys } from '../../../translate/keys/TranslateCommonKeys';
import { IBookingPost } from '../../../types/api/IBookingPost';
import { useRoomApi } from '../useRoomsApi';

export const usePostBooking = () => {
    const { logError, logSuccess } = useLogManager();
    const { translateCommon } = useTranslateCommon();
    const { translateBooking } = useTranslateBooking();

    const { postBooking } = useRoomApi();

    const handlePostBooking = useCallback((params: IBookingPost, callBack: () => void) => {
        postBooking(params).then(() => {
            callBack();
            logSuccess(translateBooking(TranslateBookingKeys.bookingSaved));
        })
            .catch((error) => {
                if (error.response.status === 409) {
                    logError(translateBooking(TranslateBookingKeys.slotAlreadyBooked), error);
                    callBack();
                } else {
                    logError(translateCommon(TranslateCommonKeys.errorWS), error);
                }
            });
    }, [logSuccess, logError, translateCommon, translateBooking, postBooking]);

    return {
        handlePostBooking,
    };
};
