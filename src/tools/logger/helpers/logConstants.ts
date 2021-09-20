import { ToastContainerProps, ToastOptions } from 'react-toastify';

const defaultToastPosition = 'top-left';
const defaultToastTimeout = 5000;

export const defaultToasterConfiguration: ToastContainerProps = {
    position: defaultToastPosition,
    autoClose: defaultToastTimeout,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'dark',
};


export const defaultToastParams: ToastOptions = {
    position: defaultToastPosition,
    autoClose: defaultToastTimeout,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
