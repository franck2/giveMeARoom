import { useEffect, useState } from 'react';

import { getNexBookingFromDate } from '../../../../../tools/booking';
import { useTranslateBooking } from '../../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../../translate/keys/TranslateBookingKeys';
import { IRoomBookingFront } from '../../../../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../../../../types/components/pages/room/IRoomDetails';
import { ElevationContainer } from '../../../../common/containers/ElevationContainer';
import { ReservationFormActions } from './ReservationFormActions';
import './scss/ReservationForm.scss';

interface IReservationFormProps {
    bookings: IRoomBookingFront[],
    roomDetails: IRoomDetails,
}

export const ReservationForm = ({ bookings, roomDetails }: IReservationFormProps) => {
    const { translateBooking } = useTranslateBooking();
    const [bookingDuration, setBookingDuration] = useState<number>(roomDetails.minimumBookingDuration);
    const [nextBooking, setNextBooking] = useState<IRoomBookingFront>();

    useEffect(() => {
        setNextBooking(getNexBookingFromDate(new Date(), bookings));
    }, [bookings]);

    return (
        <ElevationContainer className={'reservation-form'}>
            <div className={'room-time-msg'}>
                <div>
                    <p>{translateBooking(TranslateBookingKeys.bookFor)}</p>
                    <p> {
                        translateBooking(TranslateBookingKeys.bookingDuration, {
                            duration: `${bookingDuration}`,
                        })
                    }
                    </p>
                </div>
            </div>
            <ReservationFormActions
                roomDetails={roomDetails}
                bookingDuration={bookingDuration}
                setBookingDuration={setBookingDuration}
                nextBooking={nextBooking}
            />
        </ElevationContainer>);
};
