import Layout from '~/pages/client/layout';
import Home from '~/pages/client/pages/home';
import Login from '~/pages/client/pages/login';
import Register from '~/pages/client/pages/register';
const publicRoutes = [
    { path: '/', component: Home, layout: Layout, role: 1 },
    { path: '/login', component: Login, layout: Layout, role: 1 },
    { path: '/register', component: Register, layout: Layout, role: 0 },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
