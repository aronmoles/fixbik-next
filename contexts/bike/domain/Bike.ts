import BikeId from './BikeId';
import BikeName from './BikeName';
import BikeYear from './BikeYear';
import BikeBrand from './BikeBrand';
import BikeModel from './BikeModel';

export default class Bike {
    constructor(
        private readonly _id: BikeId,
        private readonly _name: BikeName,
        private readonly _brand: BikeBrand,
        private readonly _model: BikeModel,
        private readonly _year: BikeYear,
    ) {
    }

    get id(): BikeId {
        return this._id;
    }

    get name(): BikeName {
        return this._name;
    }

    get brand(): BikeBrand {
        return this._brand;
    }

    get model(): BikeModel {
        return this._model;
    }

    get year(): BikeYear {
        return this._year;
    }
}
