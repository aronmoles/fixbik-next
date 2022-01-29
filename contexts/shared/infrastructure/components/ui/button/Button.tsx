import { FC } from 'react';

type ButtonProps = {
    onClick?: () => void,
    disabled?: boolean,
    type?: 'submit' | 'reset' | 'button',
}

export const Button: FC<ButtonProps> = ({ children, onClick, disabled, type }) => {
    return (
        <button
            onClick={() => onClick && onClick()}
            disabled={disabled}
            type={type}
        >{children}</button>
    );
}
