import { IRoomBookingFront } from '../types/components/pages/room/IRoomBooking';
import { isSameOrAfterTime } from './date';

export const getNexBookingFromDate = (
    date: Date,
    bookings: IRoomBookingFront[],
): IRoomBookingFront | undefined => {
    let indexBooking = 0;
    let foundBooking;

    while (foundBooking === undefined && indexBooking < bookings.length) {
        if (isSameOrAfterTime(bookings[indexBooking].start, date) ||
        isSameOrAfterTime(bookings[indexBooking].end, date)) {
            foundBooking = bookings[indexBooking];
        }
        indexBooking++;
    }

    return foundBooking;
};
