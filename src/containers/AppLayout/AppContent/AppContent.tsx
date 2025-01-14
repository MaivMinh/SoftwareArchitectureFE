import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { IRoute } from '../../../interfaces';
import AppBreadcrumb from '../AppBreadcrumb';
import { Switch, Redirect, Route } from 'react-router-dom';
import ManageAccounts from 'containers/Admin/ManageAccounts';
import CreateAccount from 'containers/Admin/CreateAccount';
import Login from 'containers/Auth/Login';

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
                path={rest.path}
                render={props => {
                  return <>{!!Component && <Component />}</>;
                }}
              />
            );
          })}
          <Route path={'/accounts/manage'} component={ManageAccounts} />
          <Route path={'/accounts/create'} component={CreateAccount} />
          <Route path={'/auth/login'} component={Login} />
          <Redirect from="/" to="/404" />
        </Switch>
      </Suspense>
    </Content>
  );
};

export default AppContent;
