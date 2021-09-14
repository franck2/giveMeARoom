import { useCallback } from 'react';

import { Form, Formik, FormikProps } from 'formik';

import { useGetToken } from '../../../api/login/calls/useGetToken';
import { useTranslateCommon } from '../../../translate/hooks/useTranslateCommon';
import { CommonKeys } from '../../../translate/keys/commonKeys';
import { ILoginForm } from '../../../types/ILoginForm';
import { TextForm } from '../../common/TextForm';
import { defaultLoginValue } from './loginConstants';
import { useValidationLogin } from './useLoginValidation';
import './scss/Login.scss';

export const Login = () => {
    const { loginValidation } = useValidationLogin();
    const { translateCommon } = useTranslateCommon();
    const { handleGetToken } = useGetToken();

    const handleSubmit = useCallback((loginForm: ILoginForm) => {
        handleGetToken(loginForm);
    }, [handleGetToken]);

    return (
        <div className={'login-body'}>
            <Formik
                initialValues={defaultLoginValue}
                validationSchema={loginValidation}
                onSubmit={handleSubmit}
                validateOnBlur
            >
                {
                    ({ values, touched, errors, handleChange, handleBlur }: FormikProps<ILoginForm>) => (
                        <Form>
                            <div className="login">
                                <TextForm
                                    isInError={touched.email === true && errors.email !== undefined}
                                    errorValue={errors.email}
                                    fieldName={'email'}
                                    fieldValue={values.email}
                                    label={translateCommon(CommonKeys.email)}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <TextForm
                                    isInError={touched.password === true && errors.password !== undefined}
                                    errorValue={errors.password}
                                    fieldName={'password'}
                                    fieldValue={values.password}
                                    label={translateCommon(CommonKeys.password)}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <button
                                    className={'submit-login'}
                                    type={'submit'}
                                    role={'button'}
                                >{translateCommon(CommonKeys.submit)}
                                </button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};
