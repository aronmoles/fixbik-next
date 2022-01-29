import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { bikeModule } from '../../../../app/container';

export const NoMatchScreen: FC = () => {
    return (
        <Navigate to={bikeModule.paths.bikeList} replace={true}/>
    )
}
