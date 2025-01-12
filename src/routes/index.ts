import { IRoute } from '../interfaces';
import { HomeOutlined } from '@ant-design/icons';
import adminRoutes from './admin';
import brandRoutes from './brand';
import Home from 'containers/Home';

const routes: IRoute[] = [
  {
    exact: true,
    path: '/',
    name: 'Trang chủ',
    icon: HomeOutlined,
    component: Home,
  },
  ...adminRoutes,
  ...brandRoutes,
];

export default routes;
