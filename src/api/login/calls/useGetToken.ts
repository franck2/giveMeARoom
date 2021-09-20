/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useCallback } from 'react';

import { useHistory } from 'react-router';

import { appRoutesUrl } from '../../../components/router/appRoutesUrl';
import { useAuthContext } from '../../../providers/AuthProvider';
import { useLogManager } from '../../../tools/logger/useLogManager';
import { useTranslateCommon } from '../../../translate/hooks/useTranslateCommon';
import { TranslateCommonKeys } from '../../../translate/keys/TranslateCommonKeys';
import { ILoginForm } from '../../../types/ILoginForm';
import { AuthActionEnum } from '../../../types/providers/auth/AuthActionEnum';
import { useLoginApi } from '../useLoginApi';

export const useGetToken = () => {
    const { getToken } = useLoginApi();
    const { dispatchAuth } = useAuthContext();
    const { logError } = useLogManager();
    const { translateCommon } = useTranslateCommon();
    const history = useHistory();

    const handleGetToken = useCallback((_loginForm: ILoginForm) => {
        getToken().then((response) => {
            dispatchAuth({
                auth: {
                    token: response.token,
                    expirationDate: new Date(response.expirationDate),
                },
                type: AuthActionEnum.UPDATE_TOKEN,
            });
            history.push(appRoutesUrl.room);
        })
            .catch((error) => {
                logError(error, translateCommon(TranslateCommonKeys.loginError));
            });
    }, [translateCommon, dispatchAuth, getToken, logError, history]);

    return {
        handleGetToken,
    };
};
