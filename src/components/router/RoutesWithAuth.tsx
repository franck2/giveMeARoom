import { Route } from 'react-router';

import { Home } from '../pages/home/Home';
import { Room } from '../pages/room/Room';
import { appRoutesUrl } from './appRoutesUrl';

export const RoutesWithAuth = () => (
    <>
        <Route path={appRoutesUrl.home} component={Home} />
        <Route path={appRoutesUrl.room} component={Room} />
    </>);
