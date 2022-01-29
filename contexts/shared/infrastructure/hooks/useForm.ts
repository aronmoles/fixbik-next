import { FormEventHandler, useMemo, useState } from 'react';

type ValidateFunction = (value: any) => string | undefined;

type FormFieldDefinition = {
    initialValue?: any,
    validate?: ValidateFunction,
    array?: boolean,
}

export type FormDefinition<T> = { [key in keyof T]: FormFieldDefinition }

type FormFieldState = {
    value: any,
    touched: boolean,
    error?: string,
    valid: boolean,
}

type FormState = { [key: string]: FormFieldState | FormFieldState[] };

interface FormField {
    value: any,
    error?: string,
    valid: boolean,
    onChange: (value: any) => void,
}

interface FormFieldArrayItem extends FormField {
    onRemove: () => void,
}

type FormFieldArray = {
    formFields: FormFieldArrayItem[],
    valid: boolean,
    onAdd: (value: any) => void,
}

type Return<FT> = {
    values: FT,
    valid: boolean,
    handleSubmit: FormEventHandler,
    formField: (key: keyof FT) => FormField,
    formFieldArray: (key: keyof FT) => FormFieldArray,
}

export const useForm = <FT>(formDefinition: FormDefinition<FT>, onSubmit: (values: FT) => void): Return<FT> => {

    const buildInitialState = (formDefinition: FormDefinition<FT>): FormState => {
        const formState: FormState = {} as FormState;
        Object.keys(formDefinition).forEach((key: string) => {
            const formFieldDefinition: FormFieldDefinition = formDefinition[key as keyof FT];
            if (formFieldDefinition.array) {
                // @ts-ignore
                formState[key] = formFieldDefinition.initialValue?.map((value: any) => ({
                    value: value,
                    touched: false,
                    valid: false,
                })) ?? [];
            } else {
                // @ts-ignore
                formState[key] = {
                    value: formFieldDefinition.initialValue,
                    touched: false,
                    valid: false,
                }
            }
        });
        return formState;
    }

    const initialState = useMemo(() => buildInitialState(formDefinition), [formDefinition])
    const [formState, setFormState] = useState<FormState>(initialState);

    const buildFormFieldValue = (oldFormFieldState: FormFieldState, newValue: any, validate?: ValidateFunction): FormFieldState => {
        const error = validate ? validate(newValue) : undefined;
        return {
            ...oldFormFieldState,
            value: newValue,
            error: error,
            valid: !error,
            touched: true,
        }
    }

    const onChangeFormField = (key: string): (value: unknown) => void => {
        return (newValue: unknown) => {
            const { validate } = formDefinition[key as keyof FT]
            setFormState({
                ...formState,
                [key]: buildFormFieldValue(formState[key] as FormFieldState, newValue, validate)
            });
        }
    }

    const onChangeFormFieldArray = (key: string, index: number): (value: any) => void => {
        return (newValue: any) => {
            const { validate } = formDefinition[key as keyof FT]
            setFormState({
                ...formState,
                [key]: (formState[key] as FormFieldState[]).map((formFieldState: FormFieldState, indexMap: number) => {
                    if (index === indexMap) {
                        // @ts-ignore
                        return buildFormFieldValue(formState[key][index], newValue, validate)
                    } else {
                        return formFieldState;
                    }
                })
            })
        }
    }

    const onAddFormFieldArray = (key: string): (value: any) => void => {
        return (newValue: any) => {
            const formFieldStates = (formState[key] as FormFieldState[]);
            const { validate } = formDefinition[key as keyof FT]
            formFieldStates.push(buildFormFieldValue({} as FormFieldState, newValue, validate))
            setFormState({
                ...formState,
                [key]: formFieldStates,
            })
        }
    }

    const onRemoveFormFieldArray = (key: string, index: number): () => void => {
        return () => {
            const formFieldStates = (formState[key] as FormFieldState[]).filter((_, filterIndex) => filterIndex !== index);
            setFormState({
                ...formState,
                [key]: formFieldStates,
            })
        }
    }

    const markAllFormFieldAsTouched = (): void => {
        const newState = { ...formState };
        Object.keys(newState).forEach((key: string) => {
            if (Array.isArray(newState[key])) {
                newState[key] = (newState[key] as FormFieldState[]).map((formFieldState) => {
                    return buildFormFieldValue(formFieldState, formFieldState.value, formDefinition[key as keyof FT].validate)
                })
            } else {
                const formFieldState = newState[key] as FormFieldState;
                newState[key] = buildFormFieldValue(formFieldState, formFieldState.value, formDefinition[key as keyof FT].validate)
            }
        })
        setFormState(newState);
    }

    const formField = (key: keyof FT): FormField => {
        if (formDefinition[key as keyof FT].array) {
            throw new Error('Not can formField of array field')
        }
        return ({
            ...(formState[key as string] as FormFieldState),
            onChange: onChangeFormField(key as string),
        });
    }

    const formFieldArray = (key: keyof FT): FormFieldArray => {
        if (!formDefinition[key as keyof FT].array) {
            throw new Error('Not can formField of not array field')
        }
        const formFieldStates = formState[key as string] as FormFieldState[];

        return ({
            formFields: formFieldStates.map((formFieldState, index) => ({
                ...formFieldState,
                onChange: onChangeFormFieldArray(key as string, index),
                onRemove: onRemoveFormFieldArray(key as string, index),
            })),
            valid: formFieldStates.every((formFieldState) => formFieldState.valid),
            onAdd: onAddFormFieldArray(key as string),
        });
    }

    const valid = Object.keys(formDefinition).every((key) => {
        if (Array.isArray(formState[key])) {
            return (formState[key] as FormFieldState[]).every((formFieldState) => formFieldState.valid);
        } else {
            return (formState[key] as FormFieldState).valid;
        }
    })

    const values = { ...formDefinition } as FT;
    Object.keys(values).forEach((key) => {
        if (Array.isArray(formState[key])) {
            // @ts-ignore
            values[key] = (formState[key] as FormFieldState[]).map((formFieldState) => formFieldState.value)
        } else {
            // @ts-ignore
            values[key] = (formState[key] as FormFieldState).value
        }
    })

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        if (valid) {
            onSubmit(values as unknown as FT)
        } else {
            markAllFormFieldAsTouched()
        }
    }

    return {
        values,
        valid,
        handleSubmit,
        formField,
        formFieldArray
    }
}
