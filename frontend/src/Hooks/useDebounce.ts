import { useState, useEffect } from 'react';

const useDebouce = (value: string, delay: number) => {
    const [debouncedValue, setSetDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSetDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebouce;
