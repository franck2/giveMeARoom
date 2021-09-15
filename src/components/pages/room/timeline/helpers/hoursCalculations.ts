/* eslint-disable no-debugger */
import { getHours } from 'date-fns';

import { maxHour, maxTimeRange, minHour } from './timeLineContants';

export const getBoundaryTimeLine = () => {
    const current = getHours(new Date());

    let endHour = 23;
    let startHour = 0;

    if (maxHour - current > maxTimeRange) {
        endHour += current + maxTimeRange / 2;
    } else if (maxHour - current < maxTimeRange / 2) {
        startHour -= maxTimeRange / 2 - (maxHour - current);
    }

    if (current - minHour > maxTimeRange) {
        startHour += current - maxTimeRange / 2;
    } else if (current - minHour < maxTimeRange / 2) {
        endHour += maxTimeRange / 2 - (current - minHour);
    }

    return {
        startHour,
        endHour,
    };
};
