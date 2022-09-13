// import { Navigate, useLocation, Outlet } from 'react-router-dom';
// import { Loading } from '~/components/loading';
// import { GetMe } from '~/services/users';
// function Auththentication() {
//     let location = useLocation();
//     const [info] = GetMe();
//     const [loading] = GetMe();
//     if (loading) {
//         return <Loading />;
//     }
//     if (info) {
//         return <Outlet />;
//     } else {
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }
// }

// export default Auththentication;

import { Navigate, useLocation } from 'react-router-dom';
import { Loading } from '~/components/loading';
import { DataContext } from '~/contexts/DataContext';
import { useContext } from 'react';
function Auththentication({ children }) {
    let location = useLocation();
    const isLogin = useContext(DataContext).isLogin;
    const loading = useContext(DataContext).loading;
    if (loading) {
        return <Loading />;
    }
    if (isLogin) {
        return children;
    } else {
        return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
    }
}

export default Auththentication;
