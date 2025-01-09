import { HomeOutlined } from '@ant-design/icons';
import ManageAccounts from 'containers/admin/ManageAccounts.tsx';
import { IRoute } from 'interfaces';

const adminRoutes: IRoute[] = [
  // TODO: add more routes for admin

  {
    exact: true,
    path: '/',
    name: 'Tài khoản',
    component: ManageAccounts,
    icon: HomeOutlined,
    children: ['/accounts', '/players', '/brands'],
  },
  {
    exact: true,
    path: '/accounts',
    name: 'Quản lý tài khoản',
    children: [],
  },
  {
    exact: true,
    path: '/players',
    name: 'Quản lý người chơi',
    children: [],
  },
  {
    exact: true,
    path: '/brands',
    name: 'Quản lý thương hiệu',
    children: [],
  },
];

export default adminRoutes;
