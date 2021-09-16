import { useEffect } from 'react';

import { useGetUser } from '../../../../api/users/calls/useGetUser';
import { getDisplayTime } from '../../../../tools/date';
import { useTranslateBooking } from '../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../translate/keys/TranslateBookingKeys';
import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';
import { ElevationContainer } from '../../../common/containers/ElevationContainer';

import './scss/RoomState.scss';

interface IRoomStateProps {
    bookedSlot?: IRoomBookingFront,
}

export const RoomState = ({ bookedSlot }: IRoomStateProps) => {
    const { translateBooking } = useTranslateBooking();
    const { user, handleGetUser } = useGetUser();

    useEffect(() => {
        if (bookedSlot?.userId) {
            handleGetUser(bookedSlot?.userId);
        }
    }, [bookedSlot?.userId, handleGetUser]);

    return (
        <ElevationContainer className={'room-state'}>
            <div className={'room-msg'}>
                {
                    bookedSlot ?
                        translateBooking(TranslateBookingKeys.alreadyUsed, {
                            reason: bookedSlot.name,
                            userName: user?.name || '',
                            from: getDisplayTime(bookedSlot.start),
                            to: getDisplayTime(bookedSlot.end),
                        }) :
                        translateBooking(TranslateBookingKeys.roomIsFree)
                }
            </div>
        </ElevationContainer>
    );
};
