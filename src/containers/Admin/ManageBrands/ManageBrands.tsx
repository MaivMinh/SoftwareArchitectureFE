import React, { useEffect, useState } from 'react';
import { Table, Input, Space, Button, Tag, Modal, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import authClient from 'service/auth';
import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';

interface Brand {
  id: number;
  name: string;
  field: string;
  address: string;
  enabled: boolean;
}

const ManageBrands: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBrands();
  }, [currentPage, pageSize]);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await authClient.get(
        `/brands?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        }
      );
      if (response.data.status === 200) {
        const { brands, totalElement, page } = response.data.data;
        const sortedBrands = brands.sort((a: Brand, b: Brand) => a.id - b.id);
        setFilteredBrands(sortedBrands);
        setCurrentPage(page);
        setTotalElements(totalElement);
      } else {
        console.log('Failed to fetch brands', response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchText(value);
    setLoading(true);
    const response = await authClient.get(
      `/brands?page=1&size=${pageSize}&name=${value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      }
    );
    if (response.data.status === 200) {
      const { brands, totalElement, page } = response.data.data;
      const sortedBrands = brands.sort((a: Brand, b: Brand) => a.id - b.id);
      setFilteredBrands(sortedBrands);
      setCurrentPage(page);
      setTotalElements(totalElement);
    } else {
      console.log('Failed to fetch brands', response.data.message);
    }
    setLoading(false);
  };

  const handleUpdate = (record: Brand) => {
    setSelectedBrand(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const payload = {
      name: values.name,
      field: values.field,
      address: values.address,
      gps: values.gps,
    };

    // Call API to update account
    const response = await authClient.patch(
      `/brands/${selectedBrand?.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      }
    );
    console.log(response.data);
    if (response.data.status === 200) {
      fetchBrands(); // Refresh accounts list
    } else {
      console.log('Failed to update brand', response.data.message);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Brand ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Brand Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Enable',
      dataIndex: 'enable',
      key: 'enable',
      render: (enable: boolean) => (
        <Tag color={enable ? 'green' : 'red'}>
          {enable ? 'Enable' : 'Disable'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Brand) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-[95%] mx-auto">
      <CentralizedSubMenu title="Trang quản lý thương hiệu" />
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
        dataSource={filteredBrands}
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
        title="Update Brand"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="field"
            label="Field"
            rules={[
              { required: true, message: 'Please input the company field!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: false, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gps"
            label="GPS"
            rules={[{ required: false, message: 'Please input the GPS!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBrands;
