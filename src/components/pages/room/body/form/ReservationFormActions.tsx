import { useCallback } from 'react';

import { useTranslateBooking } from '../../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../../translate/keys/TranslateBookingKeys';
import { IconKeyEnum } from '../../../../../types/components/common/icon/IconKeyEnum';
import { IRoomDetails } from '../../../../../types/components/pages/room/IRoomDetails';
import { Icon } from '../../../../common/icon/Icon';
import './scss/ReservationFormActions.scss';

interface IReservationFormActionsProps {
    roomDetails: IRoomDetails,
    bookingDuration: number,
    setBookingDuration: (newDuration: number) => void,
}

export const ReservationFormActions = ({
    roomDetails,
    bookingDuration,
    setBookingDuration,
}: IReservationFormActionsProps) => {
    const { translateBooking } = useTranslateBooking();

    const handleMoreDuration = useCallback(() => {
        setBookingDuration(bookingDuration + roomDetails.bookingDurationStep);
    }, [bookingDuration, roomDetails.bookingDurationStep, setBookingDuration]);

    const handleLessDuration = useCallback(() => {
        setBookingDuration(bookingDuration - roomDetails.bookingDurationStep);
    }, [bookingDuration, roomDetails.bookingDurationStep, setBookingDuration]);

    return (
        <div>
            <button
                role={'button'}
                className={'button'}
                onClick={handleLessDuration}
                disabled={bookingDuration <= roomDetails.minimumBookingDuration}
            >
                <Icon iconKey={IconKeyEnum.MINUS} />
            </button>
            <button role={'button'} className={'button central-button'}>
                {translateBooking(TranslateBookingKeys.handleBook)}
            </button>
            <button
                role={'button'}
                className={'button'}
                onClick={handleMoreDuration}
                disabled={roomDetails.maximumBookingDuration <= bookingDuration}
            >
                <Icon iconKey={IconKeyEnum.PLUS} />
            </button>
        </div>
    );
};
