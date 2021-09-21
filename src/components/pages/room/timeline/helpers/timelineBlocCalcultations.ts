import { ITimeLineBloc } from '../../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { RoomStatusEnum } from '../../../../../types/components/pages/room/timeline/RoomStatusEnum';
import { getBoundaryTimeLine } from './hoursCalculations';
import { getSlotsHour } from './slotCalculation';
import { maxHour } from './timeLineContants';

export const removeBookingMinutes = (
    freeMinutesByHours: Map<number, number[]>,
    bookedMinutesByHours: Map<number, number[]>,
) => {
    const hoursReservedIterator = bookedMinutesByHours.entries();

    for (const bookedMinutes of hoursReservedIterator) {
        const freeMinutes = freeMinutesByHours.get(bookedMinutes[0]);

        if (freeMinutes) {
            const newFreeMinutes = freeMinutes.filter((minutes) => !bookedMinutes[1].includes(minutes));

            freeMinutesByHours.set(bookedMinutes[0], newFreeMinutes);
        }
    }
};

export const getMinuteBlocByHours = (
    freeMinutesByHours: Map<number, number[]>,
    bookedMinutesByHours: Map<number, ITimeLineBloc[]>,
) => {
    const timeline: Map<number, ITimeLineBloc[]> = new Map();

    const times = getBoundaryTimeLine();

    // For the last boundary we need to go to 23:59
    // We can't use 24 as max hour so we use this assignation
    const lastHour = times.endHour === maxHour ? maxHour + 1 : times.endHour;
    const firstHour = times.endHour === maxHour ? times.startHour + 1 : times.startHour;

    for (let indexHour = firstHour; indexHour < lastHour; indexHour++) {
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
