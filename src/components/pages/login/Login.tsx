import { useCallback } from 'react';

import { Form, Formik, FormikProps } from 'formik';

import { useGetToken } from '../../../api/login/calls/useGetToken';
import { ILoginForm } from '../../../types/ILoginForm';
import { defaultLoginValues } from './helpers/loginConstants';
import { useValidationLogin } from './hooks/useLoginValidation';
import { LoginForm } from './LoginForm';

import './scss/Login.scss';

export const Login = () => {
    const { loginValidation } = useValidationLogin();
    const { handleGetToken } = useGetToken();

    const handleSubmit = useCallback((loginForm: ILoginForm) => {
        handleGetToken(loginForm);
    }, [handleGetToken]);

    return (
        <div className={'login-body'}>
            <Formik
                initialValues={defaultLoginValues}
                validationSchema={loginValidation}
                onSubmit={handleSubmit}
                validateOnBlur
            >
                {
                    ({ values, touched, errors, handleChange, handleBlur }: FormikProps<ILoginForm>) => (
                        <Form>
                            <LoginForm
                                errors={errors}
                                values={values}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                            />
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};
