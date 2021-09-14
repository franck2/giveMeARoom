import { AuthActionEnum } from './AuthActionEnum';
import { IAuthContext } from './IAuthContext';

export interface IAuthAction {
    type: AuthActionEnum,
    auth: IAuthContext,
}
