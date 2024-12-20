import React from 'react';
import { Result } from 'antd';
import { BackToHomeButton, LogoutButton } from 'components/shared/Button';

const Page403: React.FC = () => {
  return (
    <Result
      className="app-result-page"
      status="404"
      title="404"
      subTitle={'Trang bạn truy cập hiện không tồn tại'}
      extra={
        <>
          <BackToHomeButton />
          <LogoutButton />
        </>
      }
    />
  );
};

export default Page403;
