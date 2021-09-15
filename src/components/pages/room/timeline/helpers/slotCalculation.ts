import { getHours, getMinutes, minutesInHour, setHours, setMinutes } from 'date-fns';

import { IRoomBookingFront } from '../../../../../types/components/pages/room/IRoomBooking';
import { ITimeLineBloc } from '../../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { RoomStatusEnum } from '../../../../../types/components/pages/room/timeline/RoomStatusEnum';
import { getBoundaryTimeLine } from './hoursCalculations';

export const getMinutesByHours = (start: Date, end: Date): Map<number, number[]> => {
    const bookingMinutesByHours = new Map();

    const beginingHour = getHours(start);
    const endingHour = getHours(end);

    for (let indexHour = beginingHour; indexHour <= endingHour; indexHour++) {
        const minutes: number[] = [];
        const beginingMinutes = indexHour === beginingHour ? getMinutes(start) : 0;
        const endingMinutes = indexHour === endingHour ? getMinutes(end) : 59;

        for (let indexMinutes = beginingMinutes; indexMinutes <= endingMinutes; indexMinutes++) {
            minutes.push(indexMinutes);
        }
        bookingMinutesByHours.set(indexHour, minutes);
    }

    return bookingMinutesByHours;
};

export const getInitializeFreeMinutesByHours = (): Map<number, number[]> => {
    const times = getBoundaryTimeLine();
    const start = setMinutes(
        setHours(
            new Date(),
            times.startHour,
        )
        , 0,
    );
    const end = setMinutes(
        setHours(
            new Date(),
            times.endHour,
        ),
        minutesInHour - 1,
    );


    return getMinutesByHours(start, end);
};

export const getSlotsHour = (
    minutes: number[],
    status: RoomStatusEnum,
    booking?: IRoomBookingFront,
): ITimeLineBloc[] => {
    const hourSlots: ITimeLineBloc[] = [];

    if (minutes.length > 0) {
        let [startMinute] = minutes;
        let [endMinute] = minutes;

        for (let indexMinutes = 1; indexMinutes < minutes.length; indexMinutes++) {
            if (minutes[indexMinutes] !== endMinute + 1) {
                hourSlots.push({
                    startMinute,
                    endMinute,
                    status,
                });
                startMinute = minutes[indexMinutes];
                endMinute = minutes[indexMinutes];
            } else {
                endMinute += 1;
            }
        }

        hourSlots.push({
            startMinute,
            endMinute,
            status,
            booking,
        });
    }

    return hourSlots;
};


export const getBookedSlot = (
    newBookedMinutesByHours: Map<number, number[]>,
    bookedMinutesByHours: Map<number, ITimeLineBloc[]>,
    booking: IRoomBookingFront,
) => {
    for (const bookedminutes of newBookedMinutesByHours) {
        if (bookedMinutesByHours.has(bookedminutes[0])) {
            const previousValues = [...(bookedMinutesByHours.get(bookedminutes[0]) || [])];

            bookedMinutesByHours.set(bookedminutes[0], previousValues);
        } else {
            bookedMinutesByHours.set(
                bookedminutes[0],
                getSlotsHour(bookedminutes[1], RoomStatusEnum.RESERVED, booking),
            );
        }
    }
};
