import React from 'react';
import { Avatar, Dropdown, Layout } from 'antd';
import { userHelpers } from 'helpers';
import {
  LogoutOutlined,
  MenuOutlined,
  DownOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC<{ onClickSiderIcon: () => void }> = ({
  onClickSiderIcon,
}) => {
  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  function handleLogout() {
    const result = userHelpers.logout();
    if (result) {
      window.location.href = '/auth/login';
    }
  }

  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  return (
    <Header className="bg-white px-[16px] select-none border-b h-[48px] leading-[48px] flex justify-between">
      <div className="flex items-center">
        <MenuOutlined
          className="cursor-pointer text-[20px]"
          onClick={onClickSiderIcon}
        />
      </div>
      <div className="flex items-center">
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
          <span className="relative ml-[16px] cursor-pointer">
            {/*TODO: chỉnh khi có api */}
            <Avatar icon={<UserOutlined />} />
            <span className="label ml-[8px]">{profile.username}</span>
            <DownOutlined className="ml-[8px]" />
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};
export default AppHeader;
