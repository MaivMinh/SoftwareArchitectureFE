import React from 'react';
import { IRoute } from 'interfaces';
import { Link } from 'react-router-dom';

const MenuItemContent: React.FC<{ item: IRoute }> = ({ item }) => {
  return (
    <Link
      to={item.path}
      title={item.name}
      onClick={e => {
        if (item.children && item.children.length > 0) e.preventDefault();
      }}
      className="text-[#ccc]"
    >
      {item.icon && <item.icon className="app-icon" />}
      <span>{item.name}</span>
    </Link>
  );
};

export default MenuItemContent;
