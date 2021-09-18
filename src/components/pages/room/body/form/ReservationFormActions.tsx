import { useCallback, useEffect, useMemo, useState } from 'react';

import { differenceInMinutes, isAfter } from 'date-fns';

import { isBetween } from '../../../../../tools/date';
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
    setBookingDuration: (newDuration: number) => void,
}

export const ReservationFormActions = ({
    roomDetails,
    bookingDuration,
    nextBooking,
    setBookingDuration,
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

        if (nextBooking && isAfter(nextBooking.start, current)) {
            setMaximumDuration(Math.min(
                differenceInMinutes(nextBooking.start, current),
                roomDetails.maximumBookingDuration,
            ));
        }
    }, [nextBooking, roomDetails.maximumBookingDuration]);


    const canBook = useMemo(() => (nextBooking === undefined ||
        !isBetween(new Date(), nextBooking.start, nextBooking.end)), [nextBooking]);

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
            <button
                role={'button '}
                className={'button central-button'}
                disabled={!canBook}
            >
                {translateBooking(TranslateBookingKeys.handleBook)}
            </button>
            <button
                role={'button'}
                className={'button'}
                onClick={handleMoreDuration}
                disabled={maximumDuration <= (bookingDuration + roomDetails.bookingDurationStep)}
            >
                <Icon iconKey={IconKeyEnum.PLUS} />
            </button>
        </div>
    );
};
