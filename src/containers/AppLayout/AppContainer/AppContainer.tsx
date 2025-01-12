import React from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';

const { Title } = Typography;

export interface AppContainerProps {
  title: React.ReactNode;
  head?: React.ReactNode;
  className?: string;
  noPaddingBody?: boolean;
  children?: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = props => {
  const { title, head, className, noPaddingBody, children } = props;

  return (
    <div className="flex flex-col flex-auto">
      {title && (
        <div className="px-4">
          <Title className="app-title" level={4}>
            {title}
          </Title>
          {head}
        </div>
      )}

      {children && (
        <div
          className={classNames({
            'flex-auto p-4 bg-gray-100': true,
            'p-0': noPaddingBody,
            ...(className && { [className]: true }),
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AppContainer;
