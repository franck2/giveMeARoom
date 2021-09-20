import { useEffect, useState } from 'react';

import { useLogManager } from '../../../tools/logger/useLogManager';
import { useTranslateCommon } from '../../../translate/hooks/useTranslateCommon';
import { TranslateCommonKeys } from '../../../translate/keys/TranslateCommonKeys';
import { IRoomDetails } from '../../../types/components/pages/room/IRoomDetails';
import { useRoomApi } from '../useRoomsApi';

export const useGetRoomDetails = () => {
    const { getResource } = useRoomApi();
    const { logError } = useLogManager();
    const { translateCommon } = useTranslateCommon();
    const [roomDetails, setRoomDetails] = useState<IRoomDetails>();

    useEffect(() => {
        getResource().then((response) => {
            setRoomDetails(response);
        })
            .catch((error) => {
                logError(translateCommon(TranslateCommonKeys.errorWS), error);
            });
    }, [logError, translateCommon, getResource]);

    return {
        roomDetails,
    };
};
