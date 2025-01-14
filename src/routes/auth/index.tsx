import Login from 'containers/Auth/Login';
import { Register } from 'containers/Auth/Register';
import { IRoute } from 'interfaces';

const authRoutes: IRoute[] = [
  // TODO: add more routes for authentication

  {
    exact: true,
    path: '/auth',
    name: 'Xác thực người dùng',
    children: ['/auth/login'],
  },
  {
    exact: true,
    path: '/auth/login',
    name: 'Đăng nhập',
    children: [''],
    component: Login,
  },
  {
    exact: true,
    path: '/auth/register',
    name: 'Tạo tài khoản',
    children: [''],
    component: Register,
  },
];

export default authRoutes;
