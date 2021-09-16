import { useTranslateCommon } from '../../../../translate/hooks/useTranslateCommon';
import { CommonKeys } from '../../../../translate/keys/commonKeys';
import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../../../types/components/pages/room/IRoomDetails';

import './scss/ReservationForm.scss';

interface IReservationFormProps {
    bookings: IRoomBookingFront[],
    roomDetails: IRoomDetails,
}

export const ReservationForm = ({ bookings, roomDetails }: IReservationFormProps) => {
    const { translateCommon } = useTranslateCommon();

    return (
        <div className={'reservation-form'}>
            <div className={'room-time-msg'}>
                <div>{translateCommon(CommonKeys.bookFor)}
                </div>
            </div>
            <div>
                <button role={'button'} className={'button'}>-</button>
                <button role={'button'} className={'button central-button'}>Réserver</button>
                <button role={'button'} className={'button'}> +</button>
            </div>
        </div>);
};
