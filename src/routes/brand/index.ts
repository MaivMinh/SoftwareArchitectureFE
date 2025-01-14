import { IRoute } from 'interfaces';
import { HomeOutlined, GiftOutlined, BarcodeOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import CreateCampaign from 'containers/Brand/CreateCampaign';
import CampaignManagement from 'containers/Brand/CampaignManagement';
import CreateVoucher from 'containers/Brand/CreateVoucher/CreateVoucher';
import VoucherManagement from 'containers/Brand/VoucherManagement/VoucherManagement';

const Home = lazy(() => import('containers/Home'));

const brandRoutes: IRoute[] = [
  {
    exact: true,
    path: '/event',
    name: 'Sự kiện',
    icon: GiftOutlined,
    component: Home,
    children: ['/event/create', '/event/manage'],
  },
  {
    exact: true,
    path: '/event/create',
    name: 'Tạo sự kiện',
    component: CreateCampaign,
  },
  {
    exact: true,
    path: '/event/manage',
    name: 'Quản lý sự kiện',
    component: CampaignManagement,
  },
  {
    exact: true,
    path: '/brand',
    name: 'Thương hiệu',
    component: Home,
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

  {
    exact: true,
    path: '/voucher',
    name: 'Voucher',
    component: Home,
    icon: BarcodeOutlined,
    children: ['/voucher/create', '/voucher/manage'],
  },
  {
    exact: true,
    path: '/voucher/create',
    name: 'Tạo voucher',
    component: CreateVoucher,
  },
  {
    exact: true,
    path: '/voucher/manage',
    name: 'Danh sách voucher',
    component: VoucherManagement,
  },
];
export default brandRoutes;
