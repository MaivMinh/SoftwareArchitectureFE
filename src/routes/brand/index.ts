import { IRoute } from 'interfaces';
import { HomeOutlined } from '@ant-design/icons';
const brandRoutes: IRoute[] = [
  // TODO: add route for brand
  // TODO: demo data, delete it later
  {
    exact: true,
    path: '/event',
    name: 'Sự kiện',
    icon: HomeOutlined,
    children: ['/event/create', '/event/manage'],
  },
  {
    exact: true,
    path: '/event/create',
    name: 'Tạo sự kiện',
  },
  {
    exact: true,
    path: '/event/manage',
    name: 'Quản lý sự kiện',
  },
  {
    exact: true,
    path: '/brand',
    name: 'Thương hiệu',
    icon: HomeOutlined,
    children: ['/brand/create', '/brand/manage'],
  },
  {
    exact: true,
    path: '/brand/create',
    name: 'Tạo thương hiệu',
  },
  {
    exact: true,
    path: '/brand/manage',
    name: 'Quản lý thương hiệu',
  },
  {
    exact: true,
    path: '/settings',
    name: 'Cài đặt',
    icon: HomeOutlined,
    children: ['/settings/profile', '/settings/security'],
  },
  {
    exact: true,
    path: '/settings/profile',
    name: 'Hồ sơ',
  },
  {
    exact: true,
    path: '/settings/security',
    name: 'Bảo mật',
  },
];
export default brandRoutes;
