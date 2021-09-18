import { getHours } from 'date-fns';

import { maxHour, maxTimeRange, minHour } from './timeLineContants';

const isRangeWillBeOutLastHour = (current: number) => maxHour - current < maxTimeRange / 2;
const isRangeWillBeOutFirtHour = (current: number) => current - maxTimeRange / 2 < minHour;

export const getBoundaryTimeLine = () => {
    const current = getHours(new Date());

    let endHour = current;
    let startHour = current;

    if (isRangeWillBeOutLastHour(current)) {
        endHour = maxHour;
        startHour -= maxTimeRange / 2 - (maxHour - current);
    } else if (isRangeWillBeOutFirtHour(current)) {
        startHour = minHour;
        endHour += maxTimeRange / 2 - (current - maxTimeRange / 2);
    } else {
        startHour -= maxTimeRange / 2;
        endHour += maxTimeRange / 2;
    }

    return {
        startHour,
        endHour,
    };
};
