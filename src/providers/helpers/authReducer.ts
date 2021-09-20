import { storeDataInLocalStorage } from '../../tools/localStorage';
import { AuthActionEnum } from '../../types/providers/auth/AuthActionEnum';
import { IAuthAction } from '../../types/providers/auth/IAuthAction';
import { IAuthContext } from '../../types/providers/auth/IAuthContext';

export const getAuthReducer = (authState: IAuthContext, action: IAuthAction) => {
    switch (action.type) {
        case AuthActionEnum.UPDATE_TOKEN: {
            const newAuth = {
                ...authState,
                token: action.auth.token,
                expirationDate: action.auth.expirationDate,
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
        case AuthActionEnum.USER_UPDATE:
            return {
                ...authState,
                userId: action.auth.userId,
                userName: action.auth.userName,

            };
        default:
            return {
                ...authState,
            };
    }
};
