import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../contexts/shared/infrastructure/auth/AuthProvider';
import { NextApplicationPage } from './next-application-page';
import Route from './route';

const Home: NextApplicationPage = () => {
    const { isAuth, logout } = useAuth();

    return (
        <>
            <h1>FixBik</h1>
            <p className="a">User {isAuth ? 'logged' : 'not logged'}</p>
            <p><Link href={Route.AUTHENTICATE}>Login</Link></p>
            <p><a href={'#'} onClick={() => logout()}>Logout</a></p>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </>
    )
}

Home.requireAuth = false;

export default Home
