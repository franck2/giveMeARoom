import i18next from 'i18next';

import { AppRoutes } from './components/router/AppRoutes';
import { AuthProvider } from './providers/AuthProvider';

import './App.scss';

console.log(navigator.language);
i18next.changeLanguage(navigator.language);
export const App = () => <AuthProvider><AppRoutes /></AuthProvider>;
