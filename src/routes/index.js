import Layout from '~/pages/client/layout';
import Home from '~/pages/client/pages/home';
import Login from '~/pages/client/pages/login';
import Register from '~/pages/client/pages/register';
import HomeAdmin from '~/pages/admin/pages/home';
import Profile from '~/pages/client/pages/profile';
import ChangePassword from '~/pages/client/pages/changepass';
import MoneyVolatility from '~/pages/client/pages/money-volatility';
import RechargeCard from '~/pages/client/pages/recharge-card';
import AtmMomo from '~/pages/client/pages/atm-momo';
import HistoryBuyAccount from '~/pages/client/pages/history-buy-account';
import CategoryGame from '~/pages/client/pages/category-game';
import AccountDetail from '~/pages/client/pages/account-detail';
import Lucky from '~/pages/client/pages/lucky';
const publicRoutes = [
  { path: '/', component: Home, layout: Layout },
  { path: '/dang-nhap', component: Login, layout: Layout },
  { path: '/dang-ki', component: Register, layout: Layout },
  { path: '/danh-muc-game/:slug', component: CategoryGame, layout: Layout },
  { path: '/chi-tiet/:id', component: AccountDetail, layout: Layout },
  { path: '/vong-quay-may-man/:slug', component: Lucky, layout: Layout },
];
const authRoutesClient = [
  { path: '/admin', component: HomeAdmin, layout: Layout },
  { path: '/thong-tin-tai-khoan', component: Profile, layout: Layout },
  { path: '/doi-mat-khau', component: ChangePassword, layout: Layout },
  { path: '/bien-dong-so-du', component: MoneyVolatility, layout: Layout },
  { path: '/nap-the', component: RechargeCard, layout: Layout },
  { path: '/nap-tien-qua-ngan-hang', component: AtmMomo, layout: Layout },
  { path: '/lich-su-mua-nick', component: HistoryBuyAccount, layout: Layout },
  { path: '/lich-su-vong-quay', component: HistoryBuyAccount, layout: Layout },
];

export { authRoutesClient, publicRoutes };
