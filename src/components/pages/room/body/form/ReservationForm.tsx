import { useState } from 'react';

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
            />
        </ElevationContainer>);
};
