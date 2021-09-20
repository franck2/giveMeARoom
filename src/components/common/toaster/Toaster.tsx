import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { defaultToasterConfiguration } from '../../../tools/logger/helpers/logConstants';
import './scss/Toaster.scss';

export const Toaster = () => (<ToastContainer
    className={'toast-container'}
    {...defaultToasterConfiguration}
/>);
