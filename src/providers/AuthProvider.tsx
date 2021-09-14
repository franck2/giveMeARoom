import { createContext, Dispatch, useContext, useReducer } from 'react';

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
                case AuthActionEnum.UPDATE_TOKEN:
                    return {
                        ...authState,
                        token: action.auth.token,
                        isAuth: true,
                    };
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
        },
    );

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
