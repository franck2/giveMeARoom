import { useCallback, useState } from 'react';

import { IUserResultApi } from '../../../types/api/IUserResultApi';
import { useUsersApi } from '../useUsersApi';


export const useGetUser = () => {
    const [user, setUser] = useState<IUserResultApi>();
    const { getUser } = useUsersApi();

    const handleGetUser = useCallback((idUser: string) => {
        getUser(idUser).then((response) => {
            setUser(response);
        })
            .catch(() => {
            // 'TODO' log
            });
    }, [getUser]);

    return {
        user,
        handleGetUser,
    };
};
