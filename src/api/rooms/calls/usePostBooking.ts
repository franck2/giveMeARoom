import { useCallback } from 'react';

import { IBookingPost } from '../../../types/api/IBookingPost';
import { useRoomApi } from '../useRoomsApi';

export const usePostBooking = () => {
    const { postBooking } = useRoomApi();

    const handlePostBooking = useCallback((params: IBookingPost, callBack: () => void) => {
        postBooking(params).then(() => {
            callBack();
        })
            .catch(() => {
            // 'TODO' log error
            });
    }, [postBooking]);

    return {
        handlePostBooking,
    };
};
