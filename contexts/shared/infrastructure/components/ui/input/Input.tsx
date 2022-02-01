import { FC, HTMLInputTypeAttribute } from 'react';
import DisableComponent from '../DisableComponent';

interface InputProps extends DisableComponent {
    value: string,
    onChange: (value: string) => void
    type?: HTMLInputTypeAttribute,
    placeholder: string,
    max?: number;
    maxLength?: number;
    min?: number;
    minLength?: number;
}

export const Input: FC<InputProps> = ({
    value,
    onChange,
    type,
    placeholder,
    disabled,
    max,
    maxLength,
    min,
    minLength,
}) => {
    return (
        <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            type={type ?? 'text'}
            placeholder={placeholder}
            disabled={disabled || false}
            max={max}
            maxLength={maxLength}
            min={min}
            minLength={minLength}
        />
    );
}
