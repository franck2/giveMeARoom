import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useTranslateBooking } from '../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../translate/keys/TranslateBookingKeys';
import { IconKeyEnum } from '../../../../types/components/common/icon/IconKeyEnum';
import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../../../types/components/pages/room/IRoomDetails';
import { ElevationContainer } from '../../../common/containers/ElevationContainer';
import { Icon } from '../../../common/icon/Icon';
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
                <button role={'button'} className={'button'}>
                    <Icon iconKey={IconKeyEnum.MINUS} />
                </button>
                <button role={'button'} className={'button central-button'}>Réserver</button>
                <button role={'button'} className={'button'}>
                    <Icon iconKey={IconKeyEnum.PLUS} />
                </button>
            </div>
        </ElevationContainer>);
};
