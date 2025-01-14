import CreateAccount from 'containers/Admin/CreateAccount/CreateAccount';
import ManageAccounts from 'containers/Admin/ManageAccounts';
import ManageBrands from 'containers/Admin/ManageBrands';
import { IRoute } from 'interfaces';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { ShopOutlined } from '@ant-design/icons';

const adminRoutes: IRoute[] = [
  // TODO: add more routes for admin

  {
    exact: true,
    path: '/accounts',
    name: 'Tài khoản',
    icon: UserOutlined,
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
    path: '/brands',
    name: 'Thương hiệu',
    icon: ShopOutlined,
    children: ['/brands/manage'],
  },
  {
    exact: true,
    path: '/brands/manage',
    component: ManageBrands,
    name: 'Quản lý thương hiệu',
    role: ['ADMIN'],
    children: [],
  },
  {
    exact: true,
    path: '/players',
    name: 'Người chơi',
    icon: TeamOutlined,
    children: ['/players/manage'],
  },
  {
    exact: true,
    path: '/players/manage',
    component: ManageBrands,
    name: 'Quản lý người chơi',
    role: ['ADMIN'],
    children: [],
  },
];

export default adminRoutes;
