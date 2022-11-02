import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface PrivateProp {
    element: JSX.Element;
}

const GuestRoute = ({ element }: PrivateProp): JSX.Element => {
    const { login, activated } = useAppSelector((state) => state.auth);
    const location = useLocation();
    const from = location.state;

    if (!login) {
        return <>{element}</>;
    } else if (login && !activated) {
        return (
            <Navigate
                to="/activate"
                state={{ from: location }}
                replace={true}
            />
        );
    }

    // @ts-ignore
    return <Navigate to={from?.from?.pathname ?? '/code-box'} replace={true} />;
};

export default GuestRoute;
