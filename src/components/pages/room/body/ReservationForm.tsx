/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useTranslateBooking } from '../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../translate/keys/TranslateBookingKeys';
import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../../../types/components/pages/room/IRoomDetails';
import { ElevationContainer } from '../../../common/containers/ElevationContainer';

import './scss/ReservationForm.scss';

interface IReservationFormProps {
    bookings: IRoomBookingFront[],
    roomDetails: IRoomDetails,
}

export const ReservationForm = ({ bookings, roomDetails }: IReservationFormProps) => {
    const { translateBooking } = useTranslateBooking();

    return (
        <ElevationContainer className={'reservation-form'}>
            <div className={'room-time-msg'}>
                <div>{translateBooking(TranslateBookingKeys.bookFor)}
                </div>
            </div>
            <div>
                <button role={'button'} className={'button'}>-</button>
                <button role={'button'} className={'button central-button'}>Réserver</button>
                <button role={'button'} className={'button'}> +</button>
            </div>
        </ElevationContainer>);
};
