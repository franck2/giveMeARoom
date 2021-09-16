import { useCallback } from 'react';

import { useTranslationGiveMeARoom } from '../useTranslation';

const i18nNamespaceFormValidation = 'formValidation';

export const useTranslateFormValidation = () => {
    const { t } = useTranslationGiveMeARoom(i18nNamespaceFormValidation);

    const translateFormValidation = useCallback(
        (key: string, data?: {[key: string]: string}) => t(`${i18nNamespaceFormValidation}:${key}`, data),
        [t],
    );

    return {
        translateFormValidation,
    };
};
