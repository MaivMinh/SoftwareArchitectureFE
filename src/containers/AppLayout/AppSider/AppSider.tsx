import { IRoute } from 'interfaces';
import React from 'react';

interface AppSiderProps {
  filteredNavigation: IRoute[];
  collapsed: boolean;
}

const AppSider: React.FC<AppSiderProps> = props => {
  return <div></div>;
};

export default AppSider;
