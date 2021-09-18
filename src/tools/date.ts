/* eslint-disable no-process-env */
import { format, isAfter, isBefore, isSameHour } from 'date-fns';
import { enGB, fr } from 'date-fns/locale';

export const getLocale = () => {
    const lang = navigator.language;

    if (lang.match(/fr/gu) || process.env.REACT_APP_ENV === 'test') {
        return fr;
    }

    return enGB;
};

export const getDisplayTime = (date: Date) => format(date, 'p', {
    locale: getLocale(),
});

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
