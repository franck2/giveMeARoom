import { AppRoutes } from './components/router/AppRoutes';
import './App.scss';
import { AuthProvider } from './providers/AuthProvider';

export const App = () => <AuthProvider><AppRoutes /></AuthProvider>;
