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
                <Route path={appRoutesUrl.login} component={Login}></Route>
                {
                    auth?.isAuth ?
                        <RoutesWithAuth /> :
                        <Redirect to={appRoutesUrl.login}/>
                }
            </Switch>
        </BrowserRouter>
    );
};
