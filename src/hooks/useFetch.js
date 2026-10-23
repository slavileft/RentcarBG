import { useEffect, useState } from 'react';

import request from '../utils/request';

export default function useFetch(path, initialData = null, token = null) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;

        request(import.meta.env.VITE_REST_URL, path, 'GET', null, token)
            .then(result => { if (!ignore) setData(result); })
            .catch(err => { if (!ignore) setError(err.message); })
            .finally(() => { if (!ignore) setIsLoading(false); });

        return () => { ignore = true; };
    }, [path, token]);

    return { data, isLoading, error };
}