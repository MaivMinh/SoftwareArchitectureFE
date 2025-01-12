import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { IRoute } from '../../../interfaces';
import AppBreadcrumb from '../AppBreadcrumb';
import { Switch, Redirect, Route } from 'react-router-dom';

const { Content } = Layout;

interface AppContentProps {
  filteredRoutes: IRoute[];
}

const AppContent: React.FC<AppContentProps> = props => {
  const { filteredRoutes } = props;
  return (
    <Content className="flex flex-col">
      <AppBreadcrumb />
      <Suspense fallback={null}>
        <Switch>
          {filteredRoutes.map(({ component: Component, ...rest }) => {
            return (
              <Route
                {...rest}
                key={rest.path}
                render={props => {
                  return <>{!!Component && <Component />}</>;
                }}
              />
            );
          })}
          <Redirect from="/" to="/404" />
        </Switch>
      </Suspense>
    </Content>
  );
};

export default AppContent;
