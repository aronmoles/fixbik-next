import { NextApplicationPage } from '../next-application-page';
import { BikeCreateDataContainer } from '../../contexts/bike/infrastructure/pages/create/BikeCreateDataContainer';
import { bikeRepository } from '../container';
import BikeCreator from '../../contexts/bike/application/BikeCreator';

const BikeAdd: NextApplicationPage = () => {
    return (
        <BikeCreateDataContainer bikeCreator={new BikeCreator(bikeRepository)} />
    )
}

BikeAdd.requireAuth = true;

export default BikeAdd
