import { useCallback } from 'react';

import { useTranslationGiveMeARoom } from '../useTranslation';

const i18nNamespaceBooking = 'booking';

export const useTranslateBooking = () => {
    const { t } = useTranslationGiveMeARoom(i18nNamespaceBooking);

    const translateBooking = useCallback(
        (key: string, data?: {[key: string]: string}) => t(`${i18nNamespaceBooking}:${key}`, data),
        [t],
    );

    return {
        translateBooking,
    };
};
