import { Route } from 'react-router';

import { Room } from '../pages/room/Room';
import { appRoutesUrl } from './appRoutesUrl';

export const RoutesWithAuth = () => (
    <>
        <Route exact path={appRoutesUrl.room} component={Room} />
    </>);
