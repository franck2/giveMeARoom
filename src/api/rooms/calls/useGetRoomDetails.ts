import { useEffect, useState } from 'react';

import { IRoomDetails } from '../../../types/components/pages/room/IRoomDetails';
import { useRoomApi } from '../useRoomsApi';

export const useGetRoomDetails = () => {
    const { getResource } = useRoomApi();
    const [roomDetails, setRoomDetails] = useState<IRoomDetails>();

    useEffect(() => {
        getResource().then((response) => {
            setRoomDetails(response);
        })
            .catch(() => {
            // 'TODO' log error
            });
    }, [getResource]);

    return {
        roomDetails,
    };
};
