import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';
import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  message,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from 'antd';
import { Link } from 'react-router-dom';
import coreClient from 'service/core';
import moment from 'moment';
const { TextArea } = Input;
const { Option } = Select;

interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  imageUrl: string | null;
  brandId: string;
}

const CampaignManagement: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const profile = localStorage.getItem('profile');
        if (!profile) {
          message.error('Vui lòng đăng nhập để thực hiện chức năng này');
          return;
        }
        const role = localStorage.getItem('role');
        if (role !== 'BRAND') {
          message.error(
            'Bạn phải là Đối tác thì mới có thể truy cập vào trang này'
          );
          return;
        }

        const token = localStorage.getItem('access-token');
        const brandId = JSON.parse(localStorage.getItem('brand-id') || '{}');

        const response = await coreClient.get(
          `/campaigns/by-brand-id?id=${brandId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          message.error('Lỗi khi lấy dữ liệu chiến dịch');
          return;
        }

        if (response.status === 200) {
          const campaignsData = response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            startDate: item.startDate,
            endDate: item.endDate,
            status: item.status,
            imageUrl: item.imageUrl,
            brandId: item.brandId,
          }));
          console.log('campaignsData:', campaignsData);
          setCampaigns(campaignsData);
          message.success('Lấy dữ liệu chiến dịch thành công');
        }
      } catch (error) {
        message.error('Có lỗi xảy ra, vui lòng thử lại sau');
      }
    };
    fetchCampaigns();
  }, []);

  const showModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    form.setFieldsValue({
      ...campaign,
      startDate: moment(campaign.startDate),
      endDate: moment(campaign.endDate),
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCampaign(null);
  };

  const handleOk = async () => {
    try {
      const header = {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      };
      const values = await form.validateFields();
      console.log('value update campaign:', selectedCampaign);
      const response = await coreClient.patch(
        `/campaigns/${selectedCampaign?.id}`,
        {
          ...values,
          startDate: values.startDate.toISOString(),
          endDate: values.endDate.toISOString(),
        },
        { headers: header }
      );
      console.log('response update campaign:', response);
      if (response.status === 200) {
        setCampaigns(
          campaigns.map(c =>
            c.id === selectedCampaign?.id ? { ...c, ...values } : c
          )
        );
        message.success('Cập nhật chiến dịch thành công');
        setIsModalVisible(false);
        setSelectedCampaign(null);
      } else {
        message.error('Lỗi khi cập nhật chiến dịch');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <CentralizedSubMenu title="Quản lý chiến dịch">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {campaigns.map(campaign => (
          <Card
            key={campaign.id}
            title={campaign.name}
            className="shadow-md"
            cover={
              <div className="h-60 p-2 w-full overflow-hidden">
                <img
                  alt={campaign.name}
                  src={campaign.imageUrl || 'https://picsum.photos/400/400'}
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
            }
          >
            <p>{campaign.description}</p>
            <p>Ngày bắt đầu: {new Date(campaign.startDate).toLocaleString()}</p>
            <p>Ngày kết thúc: {new Date(campaign.endDate).toLocaleString()}</p>
            <p>Trạng thái: {campaign.status}</p>
            <div className="flex justify-between mt-4">
              <Button type="primary" onClick={() => showModal(campaign)}>
                <p>Chỉnh sửa</p>
              </Button>
              <Button type="default" onClick={() => showModal(campaign)}>
                <Link to={`/event/${campaign.id}/game`}>Game</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal
        title="Chỉnh sửa chiến dịch"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên chiến dịch"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên chiến dịch' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
          >
            <DatePicker showTime className="w-full" />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="endDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
          >
            <DatePicker showTime className="w-full" />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select className="w-full">
              <Option value="Upcoming">Upcoming</Option>
              <Option value="Ongoing">Ongoing</Option>
              <Option value="Ended">Ended</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </CentralizedSubMenu>
  );
};

export default CampaignManagement;
