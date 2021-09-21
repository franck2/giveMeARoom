import { getHours, getMinutes, minutesInHour, setHours, setMinutes } from 'date-fns';

import { IRoomBookingFront } from '../../../../../types/components/pages/room/IRoomBooking';
import { ITimeLineBloc } from '../../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { RoomStatusEnum } from '../../../../../types/components/pages/room/timeline/RoomStatusEnum';
import { getBoundaryTimeLine } from './hoursCalculations';
import { numberOfMinutesInOneHour } from './timeLineContants';

export const getMinutesByHours = (start: Date, end: Date): Map<number, number[]> => {
    const bookingMinutesByHours = new Map();

    const beginingHour = getHours(start);
    const endingHour = getHours(end);

    for (let indexHour = beginingHour; indexHour <= endingHour; indexHour++) {
        const minutes: number[] = [];
        const beginingMinutes = indexHour === beginingHour ? getMinutes(start) : 0;
        const endingMinutes = indexHour === endingHour ? getMinutes(end) : numberOfMinutesInOneHour - 1;

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


export const addBookedSlot = (
    bookedMinutesByHours: Map<number, ITimeLineBloc[]>,
    newBookedMinutesByHours: Map<number, number[]>,
    booking: IRoomBookingFront,
    userId?: string,
) => {
    for (const bookedminutes of newBookedMinutesByHours) {
        const slotStatus = booking.userId === userId ? RoomStatusEnum.SELF_BOOKED : RoomStatusEnum.BOOKED;

        const newSlots = [
            ...(bookedMinutesByHours.get(bookedminutes[0]) || []),
            ...getSlotsHour(bookedminutes[1], slotStatus, booking),
        ];


        bookedMinutesByHours.set(
            bookedminutes[0],
            newSlots,
        );
    }
};

export const getSlotSize = (slot: ITimeLineBloc) => slot.endMinute - slot.startMinute + 1;
