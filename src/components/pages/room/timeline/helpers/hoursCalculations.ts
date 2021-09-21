import { getHours } from 'date-fns';

import { maxHour, maxTimeRange, minHour } from './timeLineContants';

const isRangeWillBeOutLastHour = (current: number) => maxHour - current < maxTimeRange / 2;
const isRangeWillBeOutFirtHour = (current: number) => current - maxTimeRange / 2 < minHour;

export const getBoundaryTimeLine = () => {
    const current = getHours(new Date());

    let endHour = current;
    let startHour = current;
    const defaultLeftRightRange = maxTimeRange / 2;

    if (isRangeWillBeOutLastHour(current)) {
        endHour = maxHour;
        startHour -= maxTimeRange - (maxHour - current);
    } else if (isRangeWillBeOutFirtHour(current)) {
        startHour = minHour;
        endHour += defaultLeftRightRange - (current - defaultLeftRightRange);
    } else {
        startHour -= defaultLeftRightRange;
        endHour += defaultLeftRightRange;
    }

    return {
        startHour,
        endHour,
    };
};
