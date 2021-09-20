import { useCallback } from 'react';

import { toast } from 'react-toastify';

import { defaultToastParams } from './helpers/logConstants';

export const useLogManager = () => {
    const logError = useCallback((msg: string, error: any) => {
        toast.error(msg, {
            ...defaultToastParams,
        });

        // eslint-disable-next-line no-process-env
        if (process.env.REACT_APP_ENV !== 'test') {
            console.error(error);
        }
    }, []);

    const logSuccess = useCallback((msg: string) => {
        toast.success(msg, {
            ...defaultToastParams,
        });
    }, []);

    return {
        logError,
        logSuccess,
    };
};
