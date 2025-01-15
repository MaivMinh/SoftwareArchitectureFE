import React from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Upload,
} from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';
import { useEffect, useState } from 'react';
import coreClient from 'service/core';
import { fpsEndpoint } from 'service/fps';

interface GameType {
  id: number;
  name: string;
  isRealtime: boolean;
  imageUrl: string;
  instruction: string;
}

const ManageGameTypes: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredGameTypes, setFilteredGameTypes] = useState<GameType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedGameType, setSelectedGameType] = useState<GameType | null>(
    null
  );
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    fetchGameTypes();
  }, [currentPage, pageSize]);

  const fetchGameTypes = async () => {
    setLoading(true);
    try {
      const response = await coreClient.get(
        `/game-types?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        }
      );
      if (response.data.status === 200) {
        const { data } = response.data;
        const sortedGameTypes = data.sort(
          (a: GameType, b: GameType) => a.id - b.id
        );
        setFilteredGameTypes(sortedGameTypes);
        setCurrentPage(1);
        setTotalElements(data.length);
      } else {
        console.log('Failed to fetch game types', response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch game types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchText(value);
    setLoading(true);
    const response = await coreClient.get(
      `/game-types?page=1&size=${pageSize}&name=${value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      }
    );
    if (response.data.status === 200) {
      const { data } = response.data;
      const sortedGameTypes = data.sort(
        (a: GameType, b: GameType) => a.id - b.id
      );
      setFilteredGameTypes(sortedGameTypes);
      setCurrentPage(1);
      setTotalElements(data.length);
    } else {
      console.log('Failed to fetch game types', response.data.message);
    }
    setLoading(false);
  };

  const handleUpdate = (record: GameType) => {
    setSelectedGameType(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const payload = {
      id: selectedGameType?.id,
      ...values,
      imageUrl: imageUrl.length > 0 ? imageUrl : selectedGameType?.imageUrl,
    };

    console.log(payload);

    // Call API to update account
    const response = await coreClient.put(`/game-types`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    });
    if (response.data.status === 200) {
      fetchGameTypes(); // Refresh accounts list
    } else {
      console.log('Failed to update game type', response.data.message);
    }
    setIsModalVisible(false);
  };

  const handleUpdateImage = async (info: any) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const imageUrl = info.file.response.url;
      form.setFieldsValue({ imageUrl });
      setImageUrl(imageUrl);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Game Type ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'address',
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt="Game Type Image"
          style={{ width: 100, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Instruction',
      dataIndex: 'instruction',
      key: 'instruction',
    },
    {
      title: 'Real-time',
      dataIndex: 'isRealtime',
      key: 'isRealtime',
      render: (isRealtime: boolean) => (
        <Tag color={isRealtime ? 'green' : 'red'}>
          {isRealtime ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: GameType) => (
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
        dataSource={filteredGameTypes}
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
          <Form.Item name="name" label="Name" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={'instruction'}
            label="Instruction"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item rules={[{ required: false }]} label="Upload Image">
            <Upload
              name="file"
              action={`${fpsEndpoint}/upload`} // Replace with your upload URL
              listType="picture"
              onChange={handleUpdateImage}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageGameTypes;
