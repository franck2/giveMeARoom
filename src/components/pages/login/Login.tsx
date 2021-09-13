import { useCallback } from 'react';

import { Form, Formik, FormikProps } from 'formik';
import { Input } from 'reakit';

import { useTranslateCommon } from '../../../translate/hooks/useTranslateCommon';
import { CommonKeys } from '../../../translate/keys/commonKeys';
import { ILoginForm } from '../../../types/ILoginForm';
import { defaultLoginValue } from './loginConstants';
import { useValidationLogin } from './useLoginValidation';

export const Login = () => {
    const { loginValidation } = useValidationLogin();
    const { translateCommon } = useTranslateCommon();
    const handleSubmit = useCallback(() => {
        console.log('submit');
    }, []);

    return (
        <div>
            <Formik
                initialValues={defaultLoginValue}
                validationSchema={loginValidation}
                onSubmit={handleSubmit}
            >
                {
                    ({ values }: FormikProps<ILoginForm>) => (
                        <Form>
                            {translateCommon(CommonKeys.email)}
                            <Input value={values.email} />
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};
