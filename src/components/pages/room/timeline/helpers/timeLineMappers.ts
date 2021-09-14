import { differenceInMinutes, getHours, getMinutes, isSameMinute, minutesInHour, setHours, setMinutes } from 'date-fns';

import { IRoomBookingFront } from '../../../../../types/components/pages/room/IRoomBooking';
import { ITimeLineBloc } from '../../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { RoomStatusEnum } from '../../../../../types/components/pages/room/timeline/RoomStatusEnum';
import { maxHour, minHour } from './timeLineContants';

const getReservedRoom = (booking: IRoomBookingFront): ITimeLineBloc => ({
    minutesFromBegining: getHours(booking.start) * getMinutes(booking.start) - minHour * minutesInHour,
    minutesDuration: differenceInMinutes(booking.end, booking.start),
    status: RoomStatusEnum.RESERVED,
});

const getFreeRoom = (bookingDate: Date, currentLeftDate: Date): ITimeLineBloc => ({
    minutesFromBegining: getHours(currentLeftDate) * getMinutes(currentLeftDate) - minHour * minutesInHour,
    minutesDuration: differenceInMinutes(bookingDate, currentLeftDate),
    status: RoomStatusEnum.FREE,
});

export const mapBookingToTimeLineBloc = (bookings: IRoomBookingFront[]): ITimeLineBloc[] => {
    let currentLeftDate = setHours(setMinutes(new Date(), 0), minHour);
    const timelineBlocs: ITimeLineBloc[] = [];

    bookings.forEach((booking) => {
        if (isSameMinute(currentLeftDate, booking.start)) {
            timelineBlocs.push(getReservedRoom(booking));
        } else {
            console.log('les deux dates',
                booking.start,
                currentLeftDate,
                differenceInMinutes(booking.start, currentLeftDate));
            timelineBlocs.push(getFreeRoom(booking.start, currentLeftDate));
            timelineBlocs.push(getReservedRoom(booking));
        }
        currentLeftDate = booking.end;
    });

    const lastDate = setHours(setMinutes(new Date(), minutesInHour - 1), maxHour);

    if (!isSameMinute(lastDate, currentLeftDate)) {
        console.log('nan ?');
        timelineBlocs.push(getFreeRoom(lastDate, currentLeftDate));
    }
    console.log('coucou', timelineBlocs, bookings);

    return timelineBlocs;
};


