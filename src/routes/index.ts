import { IRoute } from '../interfaces';
import { HomeOutlined } from '@ant-design/icons';
import adminRoutes from './admin';
import brandRoutes from './brand';

const routes: IRoute[] = [
  {
    exact: true,
    path: '/',
    name: 'Trang chủ',
    icon: HomeOutlined,
  },
  // TODO: check role rồi chọn loại route mong muốn
  ...adminRoutes,
  ...brandRoutes,
];

export default routes;
