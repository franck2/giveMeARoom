/* eslint-disable no-process-env */
import { format, isAfter, isBefore, isSameMinute } from 'date-fns';
import { enGB, fr } from 'date-fns/locale';

/* we do not test this function because in test mode it alwas return the same value*/
/* istanbul ignore next */
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
) => isSameMinute(date, dateToCompare) || isAfter(date, dateToCompare);


export const isSameOrBeforeTime = (
    date: Date,
    dateToCompare: Date,
) => isSameMinute(date, dateToCompare) || isBefore(date, dateToCompare);

export const isBetween = (
    date: Date,
    start: Date,
    end: Date,
) => isSameOrAfterTime(date, start) && isSameOrBeforeTime(date, end);
