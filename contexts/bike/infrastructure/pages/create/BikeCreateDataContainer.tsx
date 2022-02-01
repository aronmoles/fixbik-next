import { FC, useState } from 'react';
import { useAuth } from '../../../../shared/infrastructure/auth/AuthProvider';
import BikeCreator from '../../../application/BikeCreator';
import Bike from '../../../domain/Bike';
import { BikeCreateView } from './BikeCreateView';

interface BikeCreateDataContainerProps {
    bikeCreator: BikeCreator,
}

export const BikeCreateDataContainer: FC<BikeCreateDataContainerProps> = ({ bikeCreator }) => {
    const [loading, setLoading] = useState(false);
    const { authToken } = useAuth();

    const create = (bike: Bike) => {
        setLoading(true);
        bikeCreator.run(bike, authToken!)
            .then(() => {})
            // eslint-disable-next-line no-console
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    return (
        <BikeCreateView
            loading={loading}
            onCreate={create}
        />
    )
}
