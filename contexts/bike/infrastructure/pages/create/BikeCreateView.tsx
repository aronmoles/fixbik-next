import { FC, useMemo } from 'react';
import Bike from '../../../domain/Bike';
import { Loading } from '../../../../shared/infrastructure/components/ui/loading/Loading';
import { FormDefinition, useForm } from '../../../../shared/infrastructure/hooks/useForm';
import { Input } from '../../../../shared/infrastructure/components/ui/input/Input';
import { Button } from '../../../../shared/infrastructure/components/ui/button/Button';
import BikeId from '../../../domain/BikeId';
import BikeName from '../../../domain/BikeName';
import BikeBrand from '../../../domain/BikeBrand';
import BikeModel from '../../../domain/BikeModel';
import BikeYear from '../../../domain/BikeYear';

type BikeForm = {
    name: string,
    brand: string,
    model: string,
    year: number,
}

interface BikeCreateViewProps {
    onCreate: (bike: Bike) => void,
    loading: boolean,
}

export const BikeCreateView: FC<BikeCreateViewProps> = ({ onCreate, loading }) => {
    const formDefinition: FormDefinition<BikeForm> = useMemo(() => ({
        name: {
            initialValue: '',
            validate: (value: string) => (value.length > 0 ? undefined : 'Campo obligatorio'),
        },
        brand: {
            initialValue: '',
            validate: (value: string) => (value.length > 0 ? undefined : 'Campo obligatorio'),
        },
        model: {
            initialValue: '',
            validate: (value: string) => (value.length > 0 ? undefined : 'Campo obligatorio'),
        },
        year: {
            initialValue: '',
            validate: (value: number) => (!value || value < 1970 || value > 2023 ? 'Error' : undefined),
        },
    }), [])

    const onSubmit = (values: BikeForm) => {
        onCreate(
            new Bike(
                BikeId.create(),
                BikeName.fromString(values.name),
                BikeBrand.fromString(values.brand),
                BikeModel.fromString(values.model),
                new BikeYear(values.year),
            )
        )
    }

    const { handleSubmit, formField } = useForm<BikeForm>(formDefinition, onSubmit);

    return (
        <>
            <h1>View</h1>
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
                    // TODO
                    min={1970}
                    // TODO
                    max={2023}
                />
                {formField('year').error}


                <Button type={'submit'} disabled={loading}>Crear</Button>
            </form>
            <Loading loading={loading} />
        </>
    )
}
