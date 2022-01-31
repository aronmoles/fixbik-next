import { FC, useEffect } from 'react';
import BikeList from '../../../application/BikeList';
import Bike from '../../../domain/Bike';
import useServiceExecutor from '../../../../shared/infrastructure/hooks/useServiceExecutor/useServiceExecutor';
import { useAuth } from '../../../../shared/infrastructure/auth/AuthProvider';
import { BikesView } from './BikesView';

interface BikeScreenProps {
    bikeList: BikeList,
}

export const BikesDataContainer: FC<BikeScreenProps> = ({ bikeList }) => {
    const { authToken } = useAuth();
    const { data, error, loading, execute } = useServiceExecutor<Bike[]>(bikeList)

    useEffect(() => {
        execute(authToken);
    }, [])

    return (
        <BikesView
            bikes={data}
            error={error}
            loading={loading}
        />
    )
}
