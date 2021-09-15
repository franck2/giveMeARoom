import { setMinutes, setHours, minutesInHour, getHours } from 'date-fns';

import { ITimeLineBloc } from '../../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { RoomStatusEnum } from '../../../../../types/components/pages/room/timeline/RoomStatusEnum';
import { getBoundaryTimeLine } from './hoursCalculations';
import { getSlotsHour } from './slotCalculation';

export const removeBookingMinutes = (
    freeMinutesByHours: Map<number, number[]>,
    reservedMinutesByHours: Map<number, number[]>,
) => {
    const hoursReservedIterator = reservedMinutesByHours.entries();

    for (const reservedMinutes of hoursReservedIterator) {
        const freeMinutes = freeMinutesByHours.get(reservedMinutes[0]);

        if (freeMinutes) {
            const newFreeMinutes = freeMinutes.filter((minutes) => !reservedMinutes[1].includes(minutes));

            freeMinutesByHours.set(reservedMinutes[0], newFreeMinutes);
        }
    }
};

export const getMinuteBlocByHours = (
    freeMinutesByHours: Map<number, number[]>,
    bookedMinutesByHours: Map<number, ITimeLineBloc[]>,
) => {
    const timeline: Map<number, ITimeLineBloc[]> = new Map();


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

    for (let indexHour = getHours(start); indexHour < getHours(end); indexHour++) {
        const minutes = freeMinutesByHours.get(indexHour) || [];
        const bookedMinutes = bookedMinutesByHours.get(indexHour) || [];


        timeline.set(indexHour,
            [
                ...getSlotsHour(minutes, RoomStatusEnum.FREE),
                ...bookedMinutes,
            ].sort((bloc1, bloc2) => bloc1.startMinute - bloc2.startMinute));
    }

    return timeline;
};
