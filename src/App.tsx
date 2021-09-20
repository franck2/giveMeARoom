import i18next from 'i18next';

import { Toaster } from './components/common/toaster/Toaster';
import { AppRoutes } from './components/router/AppRoutes';
import { AuthProvider } from './providers/AuthProvider';

import './App.scss';

i18next.changeLanguage(navigator.language);
export const App = () => (

    <AuthProvider>
        <AppRoutes />
        <Toaster />
    </AuthProvider>
);
