import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/shared/infrastructure/auth/AuthProvider';
import { authStore } from './container';
import { AuthGuard } from '../contexts/shared/infrastructure/auth/AuthGuard';
import { NextApplicationPage } from './next-application-page';

function FixBikApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider authStore={authStore}>
            {(Component as NextApplicationPage).requireAuth ? (
                <AuthGuard>
                    <Component {...pageProps} />
                </AuthGuard>
            ) : (
                // public page
                <Component {...pageProps} />
            )}
        </AuthProvider>
    )
}

export default FixBikApp
