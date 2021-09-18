import { format, isAfter, isBefore, isSameHour } from 'date-fns';


export const getDisplayTime = (date: Date) => format(date, 'p');

export const isSameOrAfterTime = (
    date: Date,
    dateToCompare: Date,
) => isSameHour(date, dateToCompare) || isAfter(date, dateToCompare);


export const isSameOrBeforeTime = (
    date: Date,
    dateToCompare: Date,
) => isSameHour(date, dateToCompare) || isBefore(date, dateToCompare);

export const isBetween = (
    date: Date,
    start: Date,
    end: Date,
) => isSameOrAfterTime(date, start) && isSameOrBeforeTime(date, end);
