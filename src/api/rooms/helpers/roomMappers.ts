import { IRoomBookingBack, IRoomBookingFront } from '../../../types/components/pages/room/IRoomBooking';

export const mapBookingBackToFront = (
    bookingsBack: IRoomBookingBack[],
): IRoomBookingFront[] => bookingsBack.map((booking) => ({
    end: new Date(booking.end),
    start: new Date(booking.start),
    id: booking.id,
    name: booking.name,
    userId: booking.userId,
}));
