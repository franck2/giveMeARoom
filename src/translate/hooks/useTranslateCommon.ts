import { useCallback } from 'react';

import { useTranslationGiveMeARoom } from '../useTranslation';

const i18nNamespaceCommon = 'common';

export const useTranslateCommon = () => {
    const { t } = useTranslationGiveMeARoom(i18nNamespaceCommon);

    const translateCommon = useCallback(
        (key: string, data?: {[key: string]: string}) => t(`${i18nNamespaceCommon}:${key}`, data),
        [t],
    );

    return {
        translateCommon,
    };
};
