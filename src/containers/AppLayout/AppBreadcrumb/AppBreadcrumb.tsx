import React from 'react';
import { Breadcrumb } from 'antd';
import { commonHooks } from 'hooks';
import { generatePath, Link, matchPath } from 'react-router-dom';

const { useCurrentRoute, usePathname } = commonHooks;

const AppBreadcrumb: React.FC = () => {
  const pathname = usePathname().pathname;
  const { matchedRoutes, currentRoute } = useCurrentRoute();

  if (!currentRoute) return null;

  const match = matchPath(pathname, {
    path: currentRoute.path,
    exact: currentRoute.exact,
  });

  const linkableRoutes = matchedRoutes
    .filter(route => !!route.component)
    .map(route => {
      if (match) {
        return { ...route, path: generatePath(route.path, match.params) };
      }
      return route;
    });

  return (
    <div className="d-flex align-items-center">
      <Breadcrumb className="p-[10px] text-[12px] leading-[16px]">
        {linkableRoutes.map(item => (
          <Breadcrumb.Item key={item.path}>
            {currentRoute?.path !== item.path ? (
              <Link to={item.path}>{item.name}</Link>
            ) : (
              item.name
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default AppBreadcrumb;
