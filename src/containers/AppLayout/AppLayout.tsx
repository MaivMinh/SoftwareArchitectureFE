import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { commonHooks } from 'hooks';
import { userHelpers } from 'helpers';
import AppContent from './AppContent/AppContent';
import routes from 'routes';
import AppSider from './AppSider';
import AppHeader from './AppHeader';

let autoCollapseSider = true;

const AppLayout: React.FC = () => {
  const { filteredRoutes, filteredNavigation } = userHelpers.filterRoute(
    routes
  );
  const { isTabletView } = commonHooks.useWindowDimensions();
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const toggleSider = () => {
    autoCollapseSider = false;
    setSiderCollapsed(collapsed => !collapsed);
  };

  useEffect(() => {
    if (autoCollapseSider) {
      setSiderCollapsed(isTabletView);
    }
  }, [isTabletView]);

  return (
    <Layout className="min-h-screen">
      <AppSider
        filteredNavigation={filteredNavigation}
        collapsed={siderCollapsed}
      />
      <Layout>
        <AppHeader onClickSiderIcon={toggleSider} />
        <AppContent filteredRoutes={filteredRoutes} />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
