import { ChangeEvent, FocusEvent } from 'react';

import { FormikErrors, FormikTouched } from 'formik';

export interface IForm<T> {
    touched: FormikTouched<T>,
    errors: FormikErrors<T>,
    values: T,
    handleChange: (event: ChangeEvent) => void,
    handleBlur: (event: FocusEvent<Element>) => void,
}
