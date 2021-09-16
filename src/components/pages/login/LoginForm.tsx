import { useTranslateCommon } from '../../../translate/hooks/useTranslateCommon';
import { TranslateCommonKeys } from '../../../translate/keys/TranslateCommonKeys';
import { IForm } from '../../../types/components/common/IForm';
import { ILoginForm } from '../../../types/ILoginForm';
import { ElevationContainer } from '../../common/containers/ElevationContainer';
import { TextForm } from '../../common/TextForm';
import './scss/Login.scss';


export const LoginForm = ({ values, touched, errors, handleBlur, handleChange }: IForm<ILoginForm>) => {
    const { translateCommon } = useTranslateCommon();

    return (
        <ElevationContainer className="login">
            <TextForm
                isInError={touched.email === true && errors.email !== undefined}
                errorValue={errors.email}
                fieldName={'email'}
                fieldValue={values.email}
                label={translateCommon(TranslateCommonKeys.email)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <TextForm
                isInError={touched.password === true && errors.password !== undefined}
                errorValue={errors.password}
                fieldName={'password'}
                fieldValue={values.password}
                label={translateCommon(TranslateCommonKeys.password)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <div className={'submit-login'}>
                <button
                    type={'submit'}
                    role={'button'}
                >{translateCommon(TranslateCommonKeys.submit)}
                </button>
            </div>
        </ElevationContainer>

    );
};
