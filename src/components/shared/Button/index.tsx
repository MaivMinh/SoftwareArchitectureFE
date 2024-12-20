import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/es/button';
import { userHelpers } from 'helpers';

const { logout } = userHelpers;

export const BackToHomeButton: React.FC<ButtonProps> = () => (
  <Link to="/">
    <Button type="primary" icon={<HomeOutlined />}>
      {'Về trang chủ'}
    </Button>
  </Link>
);

export const LogoutButton: React.FC<ButtonProps> = () => (
  <Button icon={<LogoutOutlined />} onClick={logout}>
    {'Đăng xuất'}
  </Button>
);
