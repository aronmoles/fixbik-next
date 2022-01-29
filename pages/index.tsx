import Link from 'next/link'
import { useAuth } from '../contexts/shared/infrastructure/auth/AuthProvider';
import { NextApplicationPage } from './next-application-page';
import Route from './route';

const Home: NextApplicationPage = () => {
    const { isAuth, logout } = useAuth();

    return (
        <>
            <h1>FixBik</h1>
            <p>User { isAuth ? 'logged' : 'not logged' }</p>
            <Link href={Route.AUTHENTICATE}>Login</Link>
            <a href={'#'} onClick={() => logout()}>Logout</a>
        </>
    )
}

Home.requireAuth = false;

export default Home
