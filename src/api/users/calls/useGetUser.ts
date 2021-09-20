import { useCallback, useState } from 'react';

import { useLogManager } from '../../../tools/logger/useLogManager';
import { useTranslateCommon } from '../../../translate/hooks/useTranslateCommon';
import { TranslateCommonKeys } from '../../../translate/keys/TranslateCommonKeys';
import { IUserResultApi } from '../../../types/api/IUserResultApi';
import { useUsersApi } from '../useUsersApi';


export const useGetUser = () => {
    const [user, setUser] = useState<IUserResultApi>();
    const { getUser } = useUsersApi();
    const { translateCommon } = useTranslateCommon();
    const { logError } = useLogManager();

    const handleGetUser = useCallback((idUser: string) => {
        getUser(idUser).then((response) => {
            setUser(response);
        })
            .catch((error) => {
                logError(translateCommon(TranslateCommonKeys.errorWS), error);
            });
    }, [logError, translateCommon, getUser]);

    return {
        user,
        handleGetUser,
    };
};
