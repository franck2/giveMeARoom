import { differenceInMinutes } from 'date-fns';

import { IRoomBookingFront } from '../../../../../types/components/pages/room/IRoomBooking';

const isDateBetweenStartEnd = (date: Date, start: Date, end: Date) => {
    const differenceFromStart = differenceInMinutes(date, start);
    const differenceFromEnd = differenceInMinutes(date, end);

    return differenceFromStart >= 0 && differenceFromEnd <= 0;
};

export const getCurrentBookedSlot = (
    bookings: IRoomBookingFront[],
): IRoomBookingFront | undefined => {
    const currentDate = new Date();
    let indexBooking = 0;
    let bookedSlot;

    while (bookedSlot === undefined && indexBooking < bookings.length) {
        if (isDateBetweenStartEnd(currentDate, bookings[indexBooking].start, bookings[indexBooking].end)) {
            bookedSlot = bookings[indexBooking];
        }
        indexBooking++;
    }

    return bookedSlot;
};
