import { ChangeEvent, FocusEvent } from 'react';

import { Input } from 'reakit';
import './scss/TextForm.scss';

interface ITextForm {
    isInError: boolean,
    errorValue?: string,
    fieldName: string,
    fieldValue: string,
    label: string,
    handleChange: (event: ChangeEvent) => void,
    handleBlur: (event: FocusEvent) => void,
}

export const TextForm = ({
    isInError,
    errorValue,
    fieldName,
    fieldValue,
    label,
    handleChange,
    handleBlur,
}: ITextForm) => (
    <div className={'text-form'}>
        <label htmlFor={fieldName}>{`${label} : `}</label>
        <Input
            value={fieldValue}
            aria-label={label}
            onChange={handleChange}
            name={fieldName}
            id={fieldName}
            onBlur={handleBlur}
        />
        <div className={'text-field-error'}>{isInError ? errorValue : '' }</div>
    </div>);
