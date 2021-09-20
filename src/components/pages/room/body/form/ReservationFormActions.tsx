import { useCallback, useEffect, useState } from 'react';

import { differenceInMinutes, isAfter } from 'date-fns';

import { useTranslateBooking } from '../../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../../translate/keys/TranslateBookingKeys';
import { IconKeyEnum } from '../../../../../types/components/common/icon/IconKeyEnum';
import { IRoomBookingFront } from '../../../../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../../../../types/components/pages/room/IRoomDetails';
import { Icon } from '../../../../common/icon/Icon';
import './scss/ReservationFormActions.scss';

interface IReservationFormActionsProps {
    roomDetails: IRoomDetails,
    bookingDuration: number,
    nextBooking?: IRoomBookingFront,
    canBook: boolean,
    setBookingDuration: (newDuration: number) => void,
    handleBookTheRoom: () => void,
}

export const ReservationFormActions = ({
    roomDetails,
    bookingDuration,
    nextBooking,
    canBook,
    setBookingDuration,
    handleBookTheRoom,
}: IReservationFormActionsProps) => {
    const { translateBooking } = useTranslateBooking();

    const [maximumDuration, setMaximumDuration] = useState<number>(roomDetails.maximumBookingDuration);

    const handleMoreDuration = useCallback(() => {
        setBookingDuration(bookingDuration + roomDetails.bookingDurationStep);
    }, [bookingDuration, roomDetails.bookingDurationStep, setBookingDuration]);

    const handleLessDuration = useCallback(() => {
        setBookingDuration(bookingDuration - roomDetails.bookingDurationStep);
    }, [bookingDuration, roomDetails.bookingDurationStep, setBookingDuration]);

    useEffect(() => {
        const current = new Date();

        if (nextBooking && isAfter(current, nextBooking.start)) {
            setMaximumDuration(Math.min(
                differenceInMinutes(current, nextBooking.start),
                roomDetails.maximumBookingDuration,
            ));
        }
    }, [nextBooking, roomDetails.maximumBookingDuration]);

    return (
        <div>
            <button
                role={'button'}
                aria-label={translateBooking(TranslateBookingKeys.decreaseBookDuration)}
                className={'button'}
                onClick={handleLessDuration}
                disabled={bookingDuration <= roomDetails.minimumBookingDuration || !canBook}
            >
                <Icon iconKey={IconKeyEnum.MINUS} />
            </button>
            <button
                role={'button '}
                className={'button central-button'}
                disabled={!canBook}
                onClick={handleBookTheRoom}
            >
                {translateBooking(TranslateBookingKeys.handleBook)}
            </button>
            <button
                role={'button'}
                className={'button'}
                aria-label={translateBooking(TranslateBookingKeys.increaseBookDuration)}
                onClick={handleMoreDuration}
                disabled={maximumDuration < (bookingDuration + roomDetails.bookingDurationStep) || !canBook}
            >
                <Icon iconKey={IconKeyEnum.PLUS} />
            </button>
        </div>
    );
};
