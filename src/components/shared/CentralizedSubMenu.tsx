import React from 'react';

import AppContainer, {
  AppContainerProps,
} from 'containers/AppLayout/AppContainer';

interface CentralizedSubMenuProps extends AppContainerProps {
  title: string;
}

const CentralizedSubMenu: React.FC<CentralizedSubMenuProps> = ({
  title,
  ...rest
}) => {
  return <AppContainer title={title} {...rest}></AppContainer>;
};

export default CentralizedSubMenu;
