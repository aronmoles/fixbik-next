import { FC, HTMLInputTypeAttribute } from 'react';
import DisableComponent from '../DisableComponent';

interface InputProps extends DisableComponent {
    value: string,
    onChange: (value: string) => void
    type?: HTMLInputTypeAttribute,
    placeholder: string,
}

export const Input: FC<InputProps> = ({ value, onChange, type, placeholder, disabled }) => {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type ?? 'text'}
            placeholder={placeholder}
            disabled={disabled || false}
        />
    );
}
