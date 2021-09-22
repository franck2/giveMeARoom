import { useCallback, useEffect, useState } from 'react';

import { useGetUser } from '../../../../api/users/calls/useGetUser';
import { useAuthContext } from '../../../../providers/AuthProvider';
import { getDisplayTime } from '../../../../tools/date';
import { useTranslateBooking } from '../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../translate/keys/TranslateBookingKeys';
import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';
import { ElevationContainer } from '../../../common/containers/ElevationContainer';

import './scss/RoomState.scss';

interface IRoomStateProps {
    bookedSlot?: IRoomBookingFront,
    handleDeleteBooking: (idBooking: string) => void,
}

export const RoomState = ({
    bookedSlot,
    handleDeleteBooking,
}: IRoomStateProps) => {
    const { translateBooking } = useTranslateBooking();
    const { user, handleGetUser } = useGetUser();
    const { auth } = useAuthContext();
    const [statusRoom, setStatusRoom] = useState('free');

    const handleCancelReservation = useCallback(() => {
        if (bookedSlot?.id) {
            handleDeleteBooking(bookedSlot.id);
        }
    }, [bookedSlot?.id, handleDeleteBooking]);

    useEffect(() => {
        if (bookedSlot?.userId) {
            handleGetUser(bookedSlot?.userId);
            setStatusRoom(bookedSlot.userId === auth?.userId ? 'self-booked' : 'booked');
        } else {
            setStatusRoom('free');
        }
    }, [auth?.userId, bookedSlot?.userId, handleGetUser]);

    return (
        <>
            {
                auth?.userId ?
                    <ElevationContainer className={`room-state actual-status-${statusRoom}`}>
                        <div className={'room-state-container'}>
                            <div className={'room-msg-container'}>
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
                            </div>
                            <div>
                                {
                                    bookedSlot?.userId === auth?.userId ?
                                        <button
                                            role={'button '}
                                            className={'cancel-reservation'}
                                            onClick={handleCancelReservation}
                                        >
                                            {translateBooking(TranslateBookingKeys.cancelReservation)}
                                        </button>
                                        : <></>
                                }
                            </div>
                        </div>
                    </ElevationContainer>
                    : <></>
            }
        </>
    );
};
