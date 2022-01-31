import { ValueObject } from '../contexts/shared/domain/value-object/ValueObject';
import Uuid from '../contexts/shared/domain/value-object/Uuid';

type Params = {[key: string]: ValueObject<string>}

type ParamsId = {
    id: Uuid,
}

const dynamicRoute = <T extends Params>(route: string) => {
    return (params: T) => {
        let completedRoute = route;
        Object.keys(params).forEach((key) => {
            completedRoute = completedRoute.replaceAll(`:${key}`, params[key].value())
        })
        return completedRoute;
    };
}

export default class Route {
    public static HOME = '/';
    public static AUTHENTICATE = '/auth/authenticate';
    public static BIKE_DETAIL = dynamicRoute<ParamsId>('/bike/:id');
    public static BIKE_EDIT = dynamicRoute<ParamsId>('/bike/:id/edit');
}
