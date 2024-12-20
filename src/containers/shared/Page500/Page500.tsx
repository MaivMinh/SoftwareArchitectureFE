import React from 'react';
import { Result } from 'antd';
import { BackToHomeButton, LogoutButton } from 'components/shared/Button';

const Page500: React.FC = () => {
  return (
    <Result
      className="app-result-page"
      status="500"
      title="500"
      subTitle={'Hệ thống hiện đang có lỗi, vui lòng thử lại sau'}
      extra={
        <>
          <BackToHomeButton />
          <LogoutButton />
        </>
      }
    />
  );
};

export default Page500;
