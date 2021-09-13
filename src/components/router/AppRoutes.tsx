import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Login } from '../pages/login/Login';
import { appRoutesUrl } from './appRoutesUrl';

export const AppRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route path={appRoutesUrl.login}><Login/></Route>
        </Switch>
    </BrowserRouter>
);
