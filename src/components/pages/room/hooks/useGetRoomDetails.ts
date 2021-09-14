import { useEffect, useState } from 'react';

import { useResourceApi } from '../../../../api/rooms/useRoomsApi';
import { IRoomDetails } from '../../../../types/components/pages/room/IRoomDetails';

export const useGetRoomDetails = () => {
    const { getResource } = useResourceApi();
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
