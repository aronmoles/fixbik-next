import { FC } from 'react';

interface CheckboxProps {
    checked: boolean,
    onChange: (checked: boolean) => void,
    disabled?: boolean,
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, disabled}) => {
    return (
        <input
            type={'checkbox'}
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            disabled={disabled}
        />
    );
}
