import { NextApplicationPage } from '../next-application-page';
import { useRouter } from 'next/router';

const BikeDetail: NextApplicationPage = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <>
            <h1>Bike detail: {id}</h1>
        </>
    )
}

BikeDetail.requireAuth = false;

export default BikeDetail
