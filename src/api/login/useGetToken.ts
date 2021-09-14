/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useCallback } from 'react';

import { useHistory } from 'react-router';

import { appRoutesUrl } from '../../components/router/appRoutesUrl';
import { useAuthContext } from '../../providers/AuthProvider';
import { ILoginForm } from '../../types/ILoginForm';
import { AuthActionEnum } from '../../types/providers/auth/AuthActionEnum';
import { useLoginApi } from './useLoginApi';

export const useGetToken = () => {
    const { getToken } = useLoginApi();
    const { dispatchAuth } = useAuthContext();
    const history = useHistory();
    const handleGetToken = useCallback((_loginForm: ILoginForm) => {
        getToken().then((response) => {
            dispatchAuth({
                auth: {
                    token: response.token,
                },
                type: AuthActionEnum.UPDATE_TOKEN,
            });
            history.push(appRoutesUrl.room);
        })
            .catch((_err) => {
                // 'TODO' log error
            });
    }, [dispatchAuth, getToken, history]);

    return {
        handleGetToken,
    };
};
