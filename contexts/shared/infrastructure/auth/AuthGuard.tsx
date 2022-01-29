import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from './AuthProvider';
import Route from '../../../../pages/route';

export function AuthGuard({ children }: { children: JSX.Element }) {
    const { isAuth } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAuth) {
            router.replace(Route.AUTHENTICATE)
        }
    }, [router, isAuth])

    if (isAuth) {
        return <>{children}</>
    }

    return null
}
