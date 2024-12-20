import { IRoute } from '../interfaces';
import { HomeOutlined } from '@ant-design/icons';

const routes: IRoute[] = [
  {
    exact: true,
    path: '/',
    name: 'Trang chủ',
    icon: HomeOutlined,
  },
];

export default routes;
