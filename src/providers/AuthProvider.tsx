import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';

import { isBefore } from 'date-fns';

import { useUsersApi } from '../api/users/useUsersApi';
import { getDataFromLocalStorage } from '../tools/localStorage';
import { useLogManager } from '../tools/logger/useLogManager';
import { useTranslateCommon } from '../translate/hooks/useTranslateCommon';
import { TranslateCommonKeys } from '../translate/keys/TranslateCommonKeys';
import { ILoginResultApi } from '../types/api/ILoginResultApi';
import { AuthActionEnum } from '../types/providers/auth/AuthActionEnum';
import { IAuthAction } from '../types/providers/auth/IAuthAction';
import { IAuthContext } from '../types/providers/auth/IAuthContext';
import { getAuthReducer } from './helpers/authReducer';

const AuthContext = createContext<IAuthContext | undefined>(undefined);
const DispatchAuth = createContext<Dispatch<IAuthAction>>(() => ({
}));


interface IAuthProviderProps {
    children: JSX.Element | JSX.Element[],
}
export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const { getMe } = useUsersApi();
    const { logError } = useLogManager();
    const { translateCommon } = useTranslateCommon();

    const [auth, dispatchAuth]: [IAuthContext, Dispatch<IAuthAction>] = useReducer(
        getAuthReducer, {
            token: '',
            expirationDate: new Date(),
        },
    );

    useEffect(() => {
        const authInfos = getDataFromLocalStorage<ILoginResultApi>(AuthActionEnum.FIRST_LOADING);
        const current = new Date();

        const lastAuthDate = authInfos ? new Date(authInfos.expirationDate) : null;

        if (authInfos !== null && lastAuthDate !== null && isBefore(current, lastAuthDate)) {
            dispatchAuth({
                auth: {
                    token: authInfos.token,
                    expirationDate: lastAuthDate,
                    isAuth: true,
                },
                type: AuthActionEnum.FIRST_LOADING,
            });
        }
    }, []);


    useEffect(() => {
        if (auth.token) {
            getMe().then((response) => {
                dispatchAuth({
                    auth: {
                        userId: response.id,
                        userName: response.name,
                    },
                    type: AuthActionEnum.USER_UPDATE,
                });
            })
                .catch((error) => {
                    logError(translateCommon(TranslateCommonKeys.errorWS), error);
                });
        }
    }, [auth.token, getMe, translateCommon, logError]);

    return (
        <AuthContext.Provider value={auth} >
            <DispatchAuth.Provider value={dispatchAuth}>
                {children}
            </DispatchAuth.Provider>
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => ({
    auth: useContext(AuthContext),
    dispatchAuth: useContext(DispatchAuth),
});
