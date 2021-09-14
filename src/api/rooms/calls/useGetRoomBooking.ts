/* on pourrait avoir besoin de la variable non utilisée si on voulait avoir accès à d'autres salles*/
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { IRoomBookingFront } from '../../../types/components/pages/room/IRoomBooking';
import { mapBookingBackToFront } from '../helpers/roomMappers';
import { useRoomApi } from '../useRoomsApi';


export const useGetRoomBooking = (_roomId: string) => {
    const [booking, setBooking] = useState<IRoomBookingFront[]>();
    const { getBooking } = useRoomApi();

    useEffect(() => {
        getBooking().then((response) => {
            setBooking(mapBookingBackToFront(response));
        })
            .catch(() => {
            // 'TODO' log
            });
    }, [getBooking]);

    return {
        booking,
    };
};
