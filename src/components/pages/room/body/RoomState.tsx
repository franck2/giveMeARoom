import { useEffect } from 'react';

import { useGetUser } from '../../../../api/users/calls/useGetUser';
import { getDisplayTime } from '../../../../tools/date';
import { useTranslateCommon } from '../../../../translate/hooks/useTranslateCommon';
import { CommonKeys } from '../../../../translate/keys/commonKeys';
import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';

import './scss/RoomState.scss';

interface IRoomStateProps {
    bookedSlot?: IRoomBookingFront,
}

export const RoomState = ({ bookedSlot }: IRoomStateProps) => {
    const { translateCommon } = useTranslateCommon();
    const { user, handleGetUser } = useGetUser();

    useEffect(() => {
        if (bookedSlot?.userId) {
            handleGetUser(bookedSlot?.userId);
        }
    }, [bookedSlot?.userId, handleGetUser]);

    return (
        <div className={'room-state'}>
            <div className={'room-msg'}>
                {
                    bookedSlot ?
                        translateCommon(CommonKeys.alreadyUsed, {
                            reason: bookedSlot.name,
                            userName: user?.name || '',
                            from: getDisplayTime(bookedSlot.start),
                            to: getDisplayTime(bookedSlot.end),
                        }) :
                        translateCommon(CommonKeys.roomIsFree)
                }
            </div>
        </div>
    );
};
