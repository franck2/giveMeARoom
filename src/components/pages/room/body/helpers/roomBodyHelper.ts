import { differenceInMinutes } from 'date-fns';

import { IRoomBookingFront } from '../../../../../types/components/pages/room/IRoomBooking';

export const getCurrentBookedSlot = (
    bookings: IRoomBookingFront[],
): IRoomBookingFront | undefined => {
    const currentDate = new Date();
    let indexBooking = 0;
    let bookedSlot;

    while (bookedSlot === undefined && indexBooking < bookings.length) {
        const differenceFromStart = differenceInMinutes(currentDate, bookings[indexBooking].start);
        const differenceFromEnd = differenceInMinutes(currentDate, bookings[indexBooking].end);

        if (differenceFromStart >= 0 && differenceFromEnd <= 0) {
            bookedSlot = bookings[indexBooking];
        }
        indexBooking++;
    }

    return bookedSlot;
};
