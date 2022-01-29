import { FC, useState } from 'react';
import { Input } from '../../../../shared/infrastructure/components/ui/input/Input';
import { Button } from '../../../../shared/infrastructure/components/ui/button/Button';
import AuthUserEmail from '../../../domain/AuthUserEmail';
import AuthUserPassword from '../../../domain/AuthUserPassword';
import { Loading } from '../../../../shared/infrastructure/components/ui/loading/Loading';

type AuthenticateViewProps = {
    onAuthenticate: (email: AuthUserEmail, password: AuthUserPassword) => void,
    loading: boolean,
    error?: string,
}

export const AuthenticateView: FC<AuthenticateViewProps> = ({ onAuthenticate, loading, error }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (isValidForm()) {
            onAuthenticate(new AuthUserEmail(email), new AuthUserPassword(password))
        }
    }

    const isValidForm = (): boolean => {
        try {
            new AuthUserEmail(email) && new AuthUserPassword(password);
            return true
        } catch (_) {
            return false;
        }
    }

    return (
        <>
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleLogin()
                }}>
                    <Input
                        value={email}
                        onChange={setEmail}
                        type={'email'}
                        placeholder={'Email'}
                    />
                    <Input
                        value={password}
                        onChange={setPassword}
                        type={'password'}
                        placeholder={'password'}
                    />
                    <Button
                        disabled={!isValidForm()}
                        type={'submit'}
                    >Acceder</Button>
                    {error && <p>{error}</p>}
                </form>
            </div>
            <Loading loading={loading}/>
        </>
    )
}
