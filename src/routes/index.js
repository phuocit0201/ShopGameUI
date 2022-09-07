import Layout from '~/pages/client/layout';
import Home from '~/pages/client/pages/home';
import Login from '~/pages/client/pages/login';
const publicRoutes = [
    { path: '/', component: Home, layout: Layout },
    { path: '/login', component: Login, layout: Layout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
