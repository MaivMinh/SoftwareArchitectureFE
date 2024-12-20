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
      onClick: userHelpers.logout,
    },
  ];

  return (
    <Header className="bg-white px-[16px] select-none border-b h-[48px] leading-[48px] flex justify-between">
      <div className="flex items-center">
        <MenuOutlined className="cursor-pointer" onClick={onClickSiderIcon} />
      </div>
      <div className="flex items-center">
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
          <span className="relative ml-[16px] cursor-pointer">
            {/*TODO: chỉnh khi có api */}
            <Avatar icon={<UserOutlined />} />
            <span className="label">name</span>
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};
export default AppHeader;
