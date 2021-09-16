import { useEffect, useState } from 'react';

import { SchemaOf, object, string } from 'yup';

import { useTranslateFormValidation } from '../../../../translate/hooks/useTranslateFromValidation';
import { TranslateFormValidationKeys } from '../../../../translate/keys/TranslateFormValidationKeys';
import { ILoginForm } from '../../../../types/ILoginForm';

export const useValidationLogin = () => {
    const [loginValidation, setLoginValidation] =
    useState<SchemaOf<ILoginForm>>();
    const { translateFormValidation } = useTranslateFormValidation();

    useEffect(() => {
        setLoginValidation(
            object().shape({
                email: string().email()
                    .required(translateFormValidation(TranslateFormValidationKeys.required)),
                password: string().required(translateFormValidation(TranslateFormValidationKeys.required)),
            }),
        );
    }, [translateFormValidation]);

    return {
        loginValidation,
    };
};
