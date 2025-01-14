import React, { useEffect, useState } from 'react';
import { Table, Input, Space, Button, Tag, Modal, Form, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import authClient from 'service/auth';
import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';

interface Account {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  active: boolean;
}

const ManageAccounts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAccounts();
  }, [currentPage, pageSize]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await authClient.get(
        `/accounts?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        }
      );
      if (response.data.status === 200) {
        const { accounts, totalElement, page } = response.data.data;
        const sortedAccounts = accounts.sort(
          (a: Account, b: Account) => a.id - b.id
        );
        setFilteredAccounts(sortedAccounts);
        setCurrentPage(page);
        setTotalElements(totalElement);
      } else {
        console.log('Failed to fetch accounts', response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchText(value);
    setLoading(true);
    const response = await authClient.get(
      `/accounts?page=1&size=${pageSize}&username=${value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      }
    );
    if (response.data.status === 200) {
      const { accounts, totalElement, page } = response.data.data;
      const sortedAccounts = accounts.sort(
        (a: Account, b: Account) => a.id - b.id
      );
      setFilteredAccounts(sortedAccounts);
      setCurrentPage(page);
      setTotalElements(totalElement);
    } else {
      console.log('Failed to fetch accounts', response.data.message);
    }
    setLoading(false);
  };

  const handleUpdate = (record: Account) => {
    setSelectedAccount(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleRemove = async (record: Account) => {
    const response = await authClient.delete(`/accounts/${record.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    });
    if (response.data.status === 200) {
      fetchAccounts();
    } else {
      console.log('Failed to delete account', response.data.message);
    }
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const payload = {
      email: values.email,
      phoneNumber: values.phoneNumber,
      isActive: values.active,
    };

    // Call API to update account
    const response = await authClient.patch(
      `/accounts/${selectedAccount?.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      }
    );
    if (response.data.status === 200) {
      fetchAccounts(); // Refresh accounts list
    } else {
      console.log('Failed to update account', response.data.message);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Account ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Account) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Button type="danger" onClick={() => handleRemove(record)}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-[95%] mx-auto">
      <CentralizedSubMenu title="Trang quản lý tài khoản người dùng" />
      <Space style={{ marginBottom: 16, float: 'right' }}>
        <Input
          placeholder="Search Username"
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 200 }}
          suffix={<SearchOutlined />}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredAccounts}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalElements,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
        rowKey="id"
      />
      <Modal
        title="Update Account"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: false, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: false, message: 'Please input the phone number!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="active" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageAccounts;
