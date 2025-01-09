import { HomeOutlined } from '@ant-design/icons';
import ManageAccounts from 'containers/admin/ManageAccounts.tsx';
import ManagePlayers from 'containers/admin/ManagePlayers.tsx';
import { IRoute } from 'interfaces';

const adminRoutes: IRoute[] = [
  // TODO: add more routes for admin

  {
    exact: true,
    path: '/accounts',
    name: 'Tài khoản',
    component: ManageAccounts,
    icon: HomeOutlined,
    children: ['/accounts/manage', '/accounts/create'],
  },
  {
    exact: true,
    path: '/accounts/manage',
    name: 'Quản lý tài khoản',
    children: [],
  },
  {
    exact: true,
    path: '/accounts/create',
    name: 'Tạo tài khoản',
    children: [],
  },

  {
    exact: true,
    path: '/players',
    name: 'Người chơi',
    component: ManagePlayers,
    icon: HomeOutlined,
    children: ['/players/manage', '/players/create'],
  },
  {
    exact: true,
    path: '/players/manage',
    name: 'Quản lý người chơi',
    children: [],
  },
];

export default adminRoutes;
