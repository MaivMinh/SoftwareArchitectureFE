import React from 'react';
import { Form, Input, Button, Typography, Space, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import authClient from 'service/auth';
const { Title } = Typography;

const Login: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const history = useHistory();

  const onFinish = async (values: { username: string; password: string }) => {
    // reveive username and password from the form
    console.log('Username: ', values.username);
    console.log('Password: ', values.password);

    const response = await authClient.post('/login', {
      username: values.username,
      password: values.password,
    });
    const data = response.data;
    console.log(data);
    if (data.status === 200) {
      const token = data.data.accessToken;
      localStorage.setItem('access-token', data.data.accessToken);
      localStorage.setItem('refresh-token', data.data.refreshToken);
      const profile = await authClient.get('/accounts/profile', {
        headers: {
          Authorization: `Bearer ${data.data.accessToken}`,
        },
      });

      if (profile.data.status === 200) {
        localStorage.setItem('role', profile.data.data.role);
        localStorage.setItem('profile', JSON.stringify(profile.data.data));
      }

      if (profile.data.data.role === 'BRAND') {
        const brandResponse = await authClient.get('/brands/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (brandResponse.status !== 200) {
          setError('Error fetching brand data');
          return;
        }
        if (brandResponse.data.status === 200) {
          localStorage.setItem(
            'brand-id',
            JSON.stringify(brandResponse.data.data.id)
          );
        }
      }
      history.push('/');
    } else {
      console.log(data.status);
      console.log(data.message);
      setError(
        'Login failed. Please check your username and password and try again.'
      );
    }
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 25%, rgba(0,212,255,1) 100%)',
      }}
      className="flex justify-center items-center h-full"
    >
      <div className="w-[400px] -translate-y-20 p-6 bg-[#FFF] rounded-[8px] shadow-[0px 4px 12px rgba(0, 0, 0, 0.15)]">
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          Login
        </Title>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}
        <Form
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="link" htmlType="button">
                Forgot password?
              </Button>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
