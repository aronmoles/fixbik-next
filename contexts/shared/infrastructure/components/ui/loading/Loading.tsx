import { FC } from 'react';

interface LoadingProps {
    loading?: boolean,
}

export const Loading: FC<LoadingProps> = ({ loading = true }) => {
    if (!loading) {
        return null;
    }

    return (
        <span>Loading</span>
    );
}
