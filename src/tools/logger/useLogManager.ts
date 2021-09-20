import { useCallback } from 'react';

import { toast } from 'react-toastify';

import { defaultToastParams } from './helpers/logConstants';

export const useLogManager = () => {
    const logError = useCallback((msg: string, error: any) => {
        toast.error(msg, {
            ...defaultToastParams,
        });
        console.error(error);
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
