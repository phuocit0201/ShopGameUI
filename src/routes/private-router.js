import { Navigate, useLocation } from 'react-router-dom';
import { DataContext } from '~/contexts/DataContext';
import { useContext } from 'react';
function Auththentication({ children }) {
    let location = useLocation();
    const isLogin = useContext(DataContext).isLogin;
    const loading = useContext(DataContext).loading;
    if (loading === false) {
        if (!isLogin) {
            return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
        }
    }

    return children;
}

export default Auththentication;
