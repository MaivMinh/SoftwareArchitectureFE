import { HomeOutlined } from '@ant-design/icons';
import CreateAccount from 'containers/Admin/CreateAccount/CreateAccount';
import ManageAccounts from 'containers/Admin/ManageAccounts';
import ManagePlayers from 'containers/Admin/ManagePlayers';
import { IRoute } from 'interfaces';

const adminRoutes: IRoute[] = [
  // TODO: add more routes for admin

  {
    exact: true,
    path: '/accounts',
    name: 'Tài khoản',
    icon: HomeOutlined,
    children: ['/accounts/manage', '/accounts/create'],
  },
  {
    exact: true,
    path: '/accounts/manage',
    component: ManageAccounts,
    name: 'Quản lý tài khoản',
    role: ['ADMIN'],
    children: [],
  },
  {
    exact: true,
    path: '/accounts/create',
    name: 'Tạo tài khoản',
    component: CreateAccount,
    role: ['ADMIN'],
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
