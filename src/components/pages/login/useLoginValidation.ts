import { useEffect, useState } from 'react';

import { SchemaOf, object, string } from 'yup';

import { ILoginForm } from '../../../types/ILoginForm';

export const useValidationLogin = () => {
    const [loginValidation, setLoginValidation] =
    useState<SchemaOf<ILoginForm>>();

    useEffect(() => {
        setLoginValidation(
            object().shape({
                email: string().email()
                    .required('required'),
                password: string().required('required'),
            }),
        );
    }, []);

    return {
        loginValidation,
    };
};
