import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';

const resolver = require('./ressources/languages.json');
const languages = Object.keys(resolver);

const addNamespace = (namespace?: string) => {
    let resources;

    try {
        // eslint-disable-next-line global-require
        resources = require(`./ressources/${namespace}.json`);
    } catch {
        console.error('can\'t find namespace');
    }

    for (const language of languages) {
        if (i18next.hasResourceBundle(language, 'languages')) {
            i18next.addResources(language, 'languages', resolver[language]);
        }

        if (
            namespace &&
            resources &&
            !i18next.hasResourceBundle(language, namespace)
        ) {
            i18next.addResources(language, namespace, resources[language]);
        }
    }

    i18next.reloadResources();
};

export const useTranslationGiveMeARoom = (nameSpace?: string) => {
    addNamespace(nameSpace);

    return useTranslation();
};

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr-FR',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
        defaultNS: 'languages',
    });
