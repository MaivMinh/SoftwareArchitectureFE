import { IRoute } from 'interfaces';
import React from 'react';
import { Layout, Menu } from 'antd';
import MenuItemContent from './MenuItemContent';
import classNames from 'classnames';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface AppSiderProps {
  filteredNavigation: IRoute[];
  collapsed: boolean;
}

const AppSider: React.FC<AppSiderProps> = props => {
  return (
    <Sider
      className="bg-[#1c222b] z-10"
      width={270}
      collapsed={props.collapsed}
      collapsible
      trigger={null}
    >
      <Menu
        className={classNames(
          'fixed top-[122px] !bg-[#1c222b] select-none pb-[52px] overflow-y-auto max-h-[calc(100vh-122px)]',
          {
            '!w-[80px]': props.collapsed,
            'w-[270px]': !props.collapsed,
          }
        )}
        theme="dark"
        mode="inline"
      >
        {props.filteredNavigation.map(levelOneItem => {
          if (levelOneItem.icon) {
            if (levelOneItem.children && levelOneItem.children.length > 0) {
              const levelTwoItems = props.filteredNavigation.filter(route =>
                levelOneItem.children.includes(route.path)
              );
              return (
                <SubMenu
                  key={levelOneItem.path}
                  title={<MenuItemContent item={levelOneItem} />}
                >
                  {levelTwoItems.map(levelTwoItem => (
                    <Menu.Item key={levelTwoItem.path}>
                      <MenuItemContent item={levelTwoItem} />
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={levelOneItem.path}>
                <MenuItemContent item={levelOneItem} />
              </Menu.Item>
            );
          }
          return null;
        })}
      </Menu>
    </Sider>
  );
};

export default AppSider;
