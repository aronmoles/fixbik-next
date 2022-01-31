import { FC, useMemo } from 'react';
import { Input } from '../../../../shared/infrastructure/components/ui/input/Input';
import { Checkbox } from '../../../../shared/infrastructure/components/ui/checkbox/Checkbox';
import { Button } from '../../../../shared/infrastructure/components/ui/button/Button';
import { FormDefinition, useForm } from '../../../../shared/infrastructure/hooks/useForm';

type FormType = {
    text: string,
    number: number,
    checkbox: boolean,
    list: string[],
}

export const BikeEditScreen: FC = () => {
    const formDefinition: FormDefinition<FormType> = useMemo(() => ({
        text: {
            initialValue: 'Hola',
            validate: (value: string) => (value.length > 10 ? undefined : 'Error, valor no valido'),
        },
        number: {
            initialValue: 9,
            validate: (value: number) => (value > 10 ? undefined : 'Error, valor no valido'),
        },
        checkbox: {
            initialValue: true,
        },
        list: {
            initialValue: ['Hola'],
            validate: (value: string) => (value.length < 10 ? 'Error, longitud no válida' : undefined),
            array: true,
        },
    }), [])

    const onSubmit = (values: FormType) => {
        console.log('ALERT', values)
    }

    const { valid, values, handleSubmit, formField, formFieldArray } = useForm<FormType>(formDefinition, onSubmit);

    return (
        <>
            <h1>Bike Edit Screen</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder={'text'}
                    value={formField('text').value}
                    onChange={formField('text').onChange}
                />
                {formField('text').error}
                <Input
                    placeholder={'number'}
                    type={'number'}
                    value={formField('number').value}
                    onChange={formField('number').onChange}
                />
                {formField('number').error}
                <Checkbox
                    checked={formField('checkbox').value}
                    onChange={formField('checkbox').onChange}
                />
                {formField('checkbox').error}

                <br/>

                Items
                {formFieldArray('list').formFields.map((formFieldArrayItem, index) => {
                    return (
                        <div key={index}>
                            <Input
                                placeholder={'number'}
                                type={'text'}
                                value={formFieldArrayItem.value}
                                onChange={(value) => formFieldArrayItem.onChange(value)}
                            />
                            <Button onClick={() => formFieldArrayItem.onRemove()}>Remove</Button>
                            <p>{formFieldArrayItem.error}</p>
                        </div>
                    )
                })}
                <Button onClick={() => formFieldArray('list').onAdd('New item')}>Add</Button>

                <br/>

                <Button type={'submit'}>Editar</Button>
            </form>

            <p>{valid ? 'Form is valid' : 'Form is invalid'}</p>
            <p>Values: {JSON.stringify(values, null, 2)}</p>
        </>
    )
}
