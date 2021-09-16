import { useEffect, useState } from 'react';

import { millisecondsInMinute } from 'date-fns';

import { getDisplayTime } from '../../tools/date';


export const Clock = () => {
    const [time, setTime] = useState<string>(getDisplayTime(new Date()));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(getDisplayTime(new Date()));
        }, millisecondsInMinute);

        return () => clearTimeout(timer);
    }, [time]);

    return <div>{time}</div>;
};
