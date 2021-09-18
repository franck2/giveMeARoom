import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePostBooking } from '../../../../../api/rooms/calls/usePostBooking';
import { getNexBookingFromDate } from '../../../../../tools/booking';
import { isBetween } from '../../../../../tools/date';
import { useTranslateBooking } from '../../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../../translate/keys/TranslateBookingKeys';
import { IBookingPost } from '../../../../../types/api/IBookingPost';
import { IRoomBookingFront } from '../../../../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../../../../types/components/pages/room/IRoomDetails';
import { ElevationContainer } from '../../../../common/containers/ElevationContainer';
import { ReservationFormActions } from './ReservationFormActions';
import './scss/ReservationForm.scss';

interface IReservationFormProps {
    bookings: IRoomBookingFront[],
    roomDetails: IRoomDetails,
    handleGetBooking: () => void,
}

export const ReservationForm = ({
    bookings,
    roomDetails,
    handleGetBooking,
}: IReservationFormProps) => {
    const { translateBooking } = useTranslateBooking();
    const { handlePostBooking } = usePostBooking();
    const [bookingDuration, setBookingDuration] = useState<number>(roomDetails.minimumBookingDuration);
    const [nextBooking, setNextBooking] = useState<IRoomBookingFront>();

    const canBook = useMemo(() => (nextBooking === undefined ||
        !isBetween(new Date(), nextBooking.start, nextBooking.end)), [nextBooking]);

    useEffect(() => {
        setNextBooking(getNexBookingFromDate(new Date(), bookings));
    }, [bookings]);

    const handleBookTheRoom = useCallback(
        () => {
            const params: IBookingPost = {
                duration: bookingDuration,
                name: translateBooking(TranslateBookingKeys.lastMinute),
            };

            handlePostBooking(params, handleGetBooking);
        },
        [bookingDuration, handlePostBooking, handleGetBooking, translateBooking],
    );

    return (
        <ElevationContainer className={'reservation-form'}>
            <div className={'room-time-msg'}>
                <div>
                    {
                        canBook ?
                            <>
                                <p>{translateBooking(TranslateBookingKeys.bookFor)}</p>
                                <p> {
                                    translateBooking(TranslateBookingKeys.bookingDuration, {
                                        duration: `${bookingDuration}`,
                                    })
                                }
                                </p>
                            </>
                            : <p>{translateBooking(TranslateBookingKeys.cantBook)}</p>
                    }
                </div>
            </div>
            <ReservationFormActions
                roomDetails={roomDetails}
                bookingDuration={bookingDuration}
                setBookingDuration={setBookingDuration}
                nextBooking={nextBooking}
                handleBookTheRoom={handleBookTheRoom}
                canBook={canBook}
            />
        </ElevationContainer>);
};
