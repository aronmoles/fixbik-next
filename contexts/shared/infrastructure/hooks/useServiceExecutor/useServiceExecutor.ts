import { useState } from 'react';
import Service from './Service';

interface ServiceExecutor<D> {
    loading: boolean,
    error?: string,
    data?: D,
    execute: (...args: any[]) => void,
}

export default function useServiceExecutor<D>(service: Service<D>): ServiceExecutor<D> {
    const [data, setData] = useState<D>();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const execute = (...args: any[]) => {
        setLoading(false)
        service.run(...args)
            .then(setData)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }

    return {
        data,
        error,
        loading,
        execute,
    };
}
