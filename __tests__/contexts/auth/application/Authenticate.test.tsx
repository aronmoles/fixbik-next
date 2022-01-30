import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MockAuthRepository from '../infrastructure/MockAuthRepository';
import { AuthenticateDataContainer } from '../../../../contexts/auth/infrastructure/pages/authentication/AuthenticateDataContainer';
import Authenticator from '../../../../contexts/auth/application/Authenticator';

test('Authenticate', async () => {
    const authRepository = new MockAuthRepository();
    render(<AuthenticateDataContainer authenticator={new Authenticator(authRepository)}/>);
    const emailElement = screen.getByTestId(/email/i);
    const passwordElement = screen.getByPlaceholderText(/password/i);
    const submitElement = screen.getByText(/Acceder/i);

    fireEvent.change(emailElement, { target: { value: 'email@example.com' }})
    fireEvent.change(passwordElement, { target: { value: 'password' }})
    fireEvent.click(submitElement)

    authRepository.authenticateShouldHaveBeenCalled();

    await screen.findByText(/Acceder/i)
});
