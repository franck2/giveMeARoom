import { IRoomBookingFront } from '../../../../../types/components/pages/room/IRoomBooking';
import { ITimeLineBloc } from '../../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { getBookedSlot,
    getInitializeFreeMinutesByHours,
    getMinutesByHours } from './slotCalculation';
import { getMinuteBlocByHours, removeBookingMinutes } from './timelineBlocCalcultations';


export const mapBookingToTimeLineBloc = (
    bookings: IRoomBookingFront[],
    userId?: string,
): Map<number, ITimeLineBloc[]> => {
    const freeMinutesByHours = getInitializeFreeMinutesByHours();
    const bookedMinutesByHours: Map<number, ITimeLineBloc[]> = new Map();

    for (const booking of bookings) {
        const newBookedMinutesByHours = getMinutesByHours(booking.start, booking.end);

        removeBookingMinutes(freeMinutesByHours, newBookedMinutesByHours);

        getBookedSlot(newBookedMinutesByHours, bookedMinutesByHours, booking, userId);
    }

    return getMinuteBlocByHours(freeMinutesByHours, bookedMinutesByHours);
};


