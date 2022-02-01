import { FC } from 'react';
import Bike from '../../../domain/Bike';
import { Loading } from '../../../../shared/infrastructure/components/ui/loading/Loading';
import { BikeForm } from '../form/BikeForm';

interface BikeCreateViewProps {
    onCreate: (bike: Bike) => void,
    loading: boolean,
}

export const BikeCreateView: FC<BikeCreateViewProps> = ({ onCreate, loading }) => {
    return (
        <>
            <h1>View</h1>
            <BikeForm
                onSubmit={onCreate}
                button={{
                    text: 'Create',
                    disabled: loading,
                }}
            />
            <Loading loading={loading}/>
        </>
    )
}
