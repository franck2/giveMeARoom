import { format } from 'date-fns';


export const getDisplayTime = (date: Date) => format(date, 'p');
