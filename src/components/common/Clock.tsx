import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const Clock = () => {
    const [time, setTime] = useState<string>(format(new Date(), 'p', {
        locale: fr,
    }));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(format(new Date(), 'p', {
                locale: fr,
            }));
        }, 60000);

        return () => clearTimeout(timer);
    }, [time]);

    return <div>{time}</div>;
};
