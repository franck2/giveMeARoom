import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { useAuthContext } from '../../providers/AuthProvider';
import { Login } from '../pages/login/Login';
import { appRoutesUrl } from './appRoutesUrl';
import { RoutesWithAuth } from './RoutesWithAuth';

export const AppRoutes = () => {
    const { auth } = useAuthContext();

    return (
        <BrowserRouter>
            <Switch>
                {
                    !auth?.isAuth ?
                        <>
                            <Route path={appRoutesUrl.login} component={Login} />
                            <Redirect to={appRoutesUrl.login}/>
                        </>
                        :
                        <>
                            <RoutesWithAuth /> :
                            <Redirect to={appRoutesUrl.room}/>
                        </>

                }

            </Switch>
        </BrowserRouter>
    );
};
