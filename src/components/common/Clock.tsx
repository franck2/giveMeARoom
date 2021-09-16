import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const Clock = () => {
    const [time, setTime] = useState<string>(format(new Date(), 'p', {
        locale: fr,
    }));

    useEffect(() => {
        setTimeout(() => {
            setTime(format(new Date(), 'p', {
                locale: fr,
            }));
        }, 1000);
    }, []);

    return <div>{time}</div>;
};
