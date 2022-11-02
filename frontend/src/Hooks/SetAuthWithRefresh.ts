import { useAppDispatch } from '../store/hooks';

import Axios from 'Services/Axios';

import { setUserRefreshToken } from 'features';
import { useLayoutEffect, useState } from 'react';

const useSetAuthWithRefresh = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        let unMounted = false;
        const controller = new AbortController();

        const getUserData = async () => {
            try {
                setLoading(true);

                const { data } = await Axios.get(
                    `${process.env.REACT_APP_API_URL}/refresh`,
                    {
                        withCredentials: true,
                        signal: controller.signal,
                    },
                );

                if (data.success && !unMounted) {
                    dispatch(setUserRefreshToken(data));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        };

        getUserData();

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [loading];
};

export default useSetAuthWithRefresh;
