import { FC, useMemo } from 'react';
import { FormDefinition, useForm } from '../../../../shared/infrastructure/hooks/useForm';
import Bike from '../../../domain/Bike';
import BikeId from '../../../domain/BikeId';
import BikeName from '../../../domain/BikeName';
import BikeBrand from '../../../domain/BikeBrand';
import BikeModel from '../../../domain/BikeModel';
import BikeYear from '../../../domain/BikeYear';
import { Input } from '../../../../shared/infrastructure/components/ui/input/Input';
import { Button } from '../../../../shared/infrastructure/components/ui/button/Button';
import ValueObjectValidator from '../../../../shared/domain/value-object/ValueObjectValidator';

interface BikeFormProps {
    bike?: Bike,
    onSubmit: (bike: Bike) => void,
    button: {
        text: string,
        disabled?: boolean,
    }
}

type BikeFormData = {
    name: string,
    brand: string,
    model: string,
    year: number,
}

export const BikeForm: FC<BikeFormProps> = ({ bike, onSubmit, button }) => {
    const formDefinition: FormDefinition<BikeFormData> = useMemo(() => ({
        name: {
            initialValue: bike?.name.toString(),
            validate: ValueObjectValidator.validate(BikeName),
        },
        brand: {
            initialValue: bike?.brand.toString(),
            validate: ValueObjectValidator.validate(BikeModel),
        },
        model: {
            initialValue: bike?.model.toString(),
            validate: ValueObjectValidator.validate(BikeBrand),
        },
        year: {
            initialValue: bike?.year.toString(),
            validate: ValueObjectValidator.validate(BikeYear),
        },
    }), [bike])

    const submit = (values: BikeFormData) => {
        onSubmit(
            new Bike(
                BikeId.create(),
                BikeName.fromString(values.name),
                BikeBrand.fromString(values.brand),
                BikeModel.fromString(values.model),
                new BikeYear(values.year),
            )
        )
    }

    const { handleSubmit, formField } = useForm<BikeFormData>(formDefinition, submit);

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder={'Name'}
                value={formField('name').value}
                onChange={formField('name').onChange}
            />
            {formField('name').error}

            <Input
                placeholder={'Brand'}
                value={formField('brand').value}
                onChange={formField('brand').onChange}
            />
            {formField('brand').error}

            <Input
                placeholder={'Model'}
                value={formField('model').value}
                onChange={formField('model').onChange}
            />
            {formField('model').error}

            <Input
                placeholder={'Year'}
                type={'number'}
                value={formField('year').value}
                onChange={formField('year').onChange}
                min={BikeYear.MIN_YEAR}
                max={BikeYear.MAX_YEAR}
            />
            {formField('year').error}

            <Button type={'submit'} disabled={button.disabled}>{button.text}</Button>
        </form>
    )
}
