import { FC } from 'react';
import Bike from '../../../domain/Bike';
import { Loading } from '../../../../shared/infrastructure/components/ui/loading/Loading';
import Link from 'next/link';
import Route from '../../../../../pages/route';

interface BikesViewProps {
    bikes?: Bike[],
    error?: string,
    loading: boolean,
}

export const BikesView: FC<BikesViewProps> = ({ bikes, loading, error }) => {
    return (
        <>
            <h1>Bikes</h1>
            <ul>
                {bikes?.map((bike, index) => (
                    <li key={index}>{bike.brand.value()} {bike.model.value()} {'=>'} <Link href={Route.BIKE_DETAIL({ id: bike.id })}>Edit</Link></li>
                ))}
            </ul>
            {error && <p>{error}</p>}
            <Loading loading={loading} />
        </>
    );
}
