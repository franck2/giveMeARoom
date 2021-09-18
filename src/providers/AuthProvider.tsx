import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';

import { isBefore } from 'date-fns';

import { getDataFromLocalStorage, storeDataInLocalStorage } from '../tools/localStorage';
import { ILoginResultApi } from '../types/api/ILoginResultApi';
import { AuthActionEnum } from '../types/providers/auth/AuthActionEnum';
import { IAuthAction } from '../types/providers/auth/IAuthAction';
import { IAuthContext } from '../types/providers/auth/IAuthContext';

const AuthContext = createContext<IAuthContext | undefined>(undefined);
const DispatchAuth = createContext<Dispatch<IAuthAction>>(() => ({
}));


interface IAuthProviderProps {
    children: JSX.Element,
}
export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [auth, dispatchAuth]: [IAuthContext, Dispatch<IAuthAction>] = useReducer(
        (authState: IAuthContext, action: IAuthAction) => {
            switch (action.type) {
                case AuthActionEnum.UPDATE_TOKEN: {
                    const newAuth = {
                        ...authState,
                        token: action.auth.token,
                        isAuth: true,
                    };

                    storeDataInLocalStorage(AuthActionEnum.FIRST_LOADING, newAuth);

                    return newAuth;
                }
                case AuthActionEnum.FIRST_LOADING: {
                    return {
                        ...authState,
                        token: action.auth.token,
                        isAuth: true,
                    };
                }
                case AuthActionEnum.HAS_TO_LOG:
                    return {
                        ...authState,
                        token: '',
                        isAuth: false,
                    };
                default:
                    return {
                        ...authState,
                    };
            }
        }, {
            token: '',
            expirationDate: new Date(),
        },
    );

    useEffect(() => {
        const authInfos = getDataFromLocalStorage<ILoginResultApi>(AuthActionEnum.FIRST_LOADING);
        const current = new Date();

        const lastAuthDate = authInfos ? new Date(authInfos.expirationDate) : null;

        if (authInfos !== null && lastAuthDate !== null && isBefore(lastAuthDate, current)) {
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
