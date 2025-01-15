import { IRoute } from 'interfaces';
import {
  GiftOutlined,
  BarcodeOutlined,
  TeamOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import CreateCampaign from 'containers/Brand/CreateCampaign';
import CampaignManagement from 'containers/Brand/CampaignManagement';
import CreateVoucher from 'containers/Brand/CreateVoucher/CreateVoucher';
import { VoucherManagement } from 'containers/Brand/VoucherManagement';
import { Game, CreateGame } from 'containers/Brand/Game';

const Home = lazy(() => import('containers/Home'));

const brandRoutes: IRoute[] = [
  {
    exact: true,
    path: '/event',
    name: 'Sự kiện',
    icon: GiftOutlined,
    component: Home,
    children: ['/event/create', '/event/manage', 'event/:id/game'],
  },
  {
    exact: true,
    path: '/event/create',
    name: 'Tạo chiến dịch',
    component: CreateCampaign,
  },
  {
    exact: true,
    path: '/event/manage',
    name: 'Quản lý chiến dịch',
    component: CampaignManagement,
  },
  {
    exact: true,
    path: '/event/:id/game',
    name: 'Game của chiến dịch',
    component: Game,
  },
  {
    exact: true,
    path: '/brand',
    name: 'Thương hiệu',
    component: Home,
    icon: TeamOutlined,
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
    path: '/game',
    name: 'Game',
    icon: PlayCircleOutlined,
    component: Home,
    children: ['/game/create', '/game/manage'],
  },
  {
    exact: true,
    path: '/game/create',
    name: 'Tạo game cho chiến dịch',
    component: CreateGame,
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
