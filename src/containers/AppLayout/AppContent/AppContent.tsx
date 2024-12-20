import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { IRoute } from '../../../interfaces';
import AppBreadcrumb from '../AppBreadcrumb';
import { Switch } from 'react-router-dom';

const { Content } = Layout;

interface AppContentProps {
  filteredRoutes: IRoute[];
}

const AppContent: React.FC<AppContentProps> = props => {
  return (
    <Content className="flex flex-col">
      <AppBreadcrumb />
      <Suspense fallback={null}>
        <Switch></Switch>
      </Suspense>
    </Content>
  );
};

export default AppContent;
