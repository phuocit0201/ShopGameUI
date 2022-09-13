import Layout from '~/pages/client/layout';
import Home from '~/pages/client/pages/home';
import Login from '~/pages/client/pages/login';
import Register from '~/pages/client/pages/register';
import HomeAdmin from '~/pages/admin/pages/home';
import Profile from '~/pages/client/pages/profile';
const publicRoutes = [
    { path: '/', component: Home, layout: Layout },
    { path: '/dang-nhap', component: Login, layout: Layout },
    { path: '/dang-ki', component: Register, layout: Layout },
];
const authRoutesClient = [
    { path: '/admin', component: HomeAdmin, layout: Layout },
    { path: '/thong-tin-tai-khoan', component: Profile, layout: Layout },
];

export { authRoutesClient, publicRoutes };
