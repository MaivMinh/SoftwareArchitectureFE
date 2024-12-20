import { IRoute } from '../interfaces';

const logout = () => {
  // TODO: remove token in localstorage
};
const getRole = () => {
  // TODO: get role user
};
const filterRoute = (items: IRoute[]) => {
  // TODO: do later, check role ...
  const filteredNavigation: IRoute[] = [];

  const filteredRoutes = filteredNavigation.filter(
    item => !item.children && item.component
  );

  return {
    filteredNavigation,
    filteredRoutes,
  };
};
export default {
  logout,
  getRole,
  filterRoute,
};
