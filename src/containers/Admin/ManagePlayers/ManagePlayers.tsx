import React, { useEffect, useState } from 'react';
import { Table, Input, Space, Button, Modal, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import authClient from 'service/auth';
import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';
import moment from 'moment';

interface Player {
  id: number;
  name: string;
  birthDate: string;
  gender: string;
  facebook: string;
}

const ManagePlayers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPlayers();
  }, [currentPage, pageSize]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await authClient.get(
        `/players?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        }
      );
      if (response.data.status === 200) {
        const { players, totalElement, page } = response.data.data;
        const sortedPlayers = players.sort(
          (a: Player, b: Player) => a.id - b.id
        );
        setFilteredPlayers(sortedPlayers);
        setCurrentPage(page);
        setTotalElements(totalElement);
      } else {
        console.log('Failed to fetch players', response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchText(value);
    setLoading(true);
    const response = await authClient.get(
      `/players?page=1&size=${pageSize}&name=${value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      }
    );
    if (response.data.status === 200) {
      const { players, totalElement, page } = response.data.data;
      const sortedPlayers = players.sort((a: Player, b: Player) => a.id - b.id);
      setFilteredPlayers(sortedPlayers);
      setCurrentPage(page);
      setTotalElements(totalElement);
    } else {
      console.log('Failed to fetch players', response.data.message);
    }
    setLoading(false);
  };

  const handleUpdate = (record: Player) => {
    setSelectedPlayer(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const payload = {
      name: values.name,
      birthDate: values.birthDate,
      gender: values.gender,
      facebook: values.facebook,
    };

    // Call API to update account
    const response = await authClient.patch(
      `/players/${selectedPlayer?.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      }
    );
    console.log(response.data);
    if (response.data.status === 200) {
      fetchPlayers(); // Refresh accounts list
    } else {
      console.log('Failed to update player', response.data.message);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Player ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Player Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Birth Date',
      dataIndex: 'birthDate',
      key: 'birthDate',
      render: (birthDate: number) => moment(birthDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Facebook',
      dataIndex: 'facebook',
      key: 'facebook',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Player) => (
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
      <CentralizedSubMenu title="Trang quản lý người chơi" />
      <Space style={{ marginBottom: 16, float: 'right' }}>
        <Input
          placeholder="Search Name"
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 200 }}
          suffix={<SearchOutlined />}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredPlayers}
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
        title="Update Player"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: false, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="facebook"
            label="Facebook"
            rules={[
              { required: false, message: 'Please input the facebook link!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePlayers;
