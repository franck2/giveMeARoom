export interface IAuthContext {
    token: string,
    expirationDate: Date,
    isAuth?: boolean,
}
