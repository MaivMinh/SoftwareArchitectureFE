import { IRoute } from '../interfaces';

const logout = () => {
  // TODO: remove token in localstorage
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('role');
  localStorage.removeItem('profile');
  return true;
};

const getRole = () => {
  const role = localStorage.getItem('role');
  if (role == null) {
    return '';
  }
  return role.trim(); // Loại bỏ khoảng trắng thừa
};

const filterRoute = (items: IRoute[]) => {
  const role = getRole();

  // TODO: do later, check role ...
  const filteredNavigation: IRoute[] = items.filter(item => {
    // Giả sử mỗi route có thuộc tính roles chứa danh sách các vai trò được phép truy cập
    if (item.role && item.role.length > 0) {
      return item.role.includes(role);
    }
    return true; // Nếu route không có thuộc tính roles, cho phép truy cập
  });

  const filteredRoutes = filteredNavigation.filter(item => !item.children);

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
