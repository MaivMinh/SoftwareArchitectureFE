import { useEffect, useState } from 'react';
import { commonHelpers } from 'helpers';
import { commonConstants } from '../constants';
import { IRoute } from '../interfaces';
import { matchPath, useLocation } from 'react-router-dom';
import routes from 'routes';

const { getWindowDimensions } = commonHelpers;
const { TABLET_WIDTH } = commonConstants;

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { ...dimensions, isTabletView: dimensions.width <= TABLET_WIDTH };
};

export const useCurrentRoute = () => {
  const [matchedRoutes, setMatchedRoutes] = useState<IRoute[]>([]);
  const location = usePathname();

  const updateCurrentRoute = () => {
    let matchedRoutes = routes.filter(route =>
      matchPath(window.location.pathname, { path: route.path })
    );
    if (matchedRoutes.some(route => route.path === window.location.pathname)) {
      matchedRoutes = matchedRoutes.filter(route => !route.path.includes(':'));
    }
    const sorted = matchedRoutes?.sort((a, b) =>
      a.path < b.path ? -1 : a.path > b.path ? 1 : 0
    );
    setMatchedRoutes(sorted);
  };

  // update current route on each navigation
  useEffect(() => {
    updateCurrentRoute();
  }, [location]);

  return {
    matchedRoutes,
    currentRoute: matchedRoutes[matchedRoutes.length - 1] as IRoute | undefined,
  };
};

const usePathname = () => {
  const [location, setLocation] = useState<{
    pathname: string;
    hash: string;
  }>({ pathname: '', hash: '' });
  const currentLocation = useLocation();

  useEffect(() => {
    setLocation({
      pathname: currentLocation.pathname,
      hash: currentLocation.hash,
    });
  }, [currentLocation]);

  useEffect(() => {
    function onPopState() {
      setLocation({
        pathname: window.location.pathname,
        hash: window.location.hash,
      });
    }

    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return location;
};
export default {
  useWindowDimensions,
  usePathname,
  useCurrentRoute,
};
