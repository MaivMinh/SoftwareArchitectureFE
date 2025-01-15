import React from 'react';
import { Form, Button, DatePicker, Select, Switch, message } from 'antd';
import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';
import moment from 'moment';
import coreClient from 'service/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

interface GameFormData {
  allowPiecesExchange: boolean;
  startAt: moment.Moment;
  gameTypeId: number;
  campaignId: number;
}

const CreateGame: React.FC = () => {
  const [form] = Form.useForm();
  const [campaigns, setCampaigns] = React.useState<any[]>([]);
  const history = useHistory();

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
          setCampaigns(campaignsData);
        }
      } catch (error) {
        message.error('Có lỗi xảy ra khi lấy dữ liệu chiến dịch');
      }
    };
    fetchCampaigns();
  }, []);

  const onFinish = async (values: GameFormData) => {
    try {
      const data = {
        allowPiecesExchange: values.allowPiecesExchange,
        startAt: values.startAt.toISOString().split('Z')[0],
        gameTypeId: values.gameTypeId,
        campaignId: values.campaignId,
      };
      const token = localStorage.getItem('access-token');
      const response = await coreClient.post('/games/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response game', response);
      console.log('data game form', data);

      if (response.status === 200) {
        message.success('Tạo game thành công');
        form.resetFields();
        setTimeout(() => {
          history.push('/game');
        }, 2000);
      } else {
        message.error('Có lỗi xảy ra, vui lòng thử lại sau');
      }
    } catch (error) {
      message.error('Lỗi hệ thống, vui lòng thử lại sau');
    }
  };

  return (
    <CentralizedSubMenu title="Tạo game mới">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
      >
        <Form.Item
          label="Cho phép trao đổi mảnh ghép"
          name="allowPiecesExchange"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Thời gian bắt đầu"
          name="startAt"
          rules={[
            { required: true, message: 'Vui lòng chọn thời gian bắt đầu' },
          ]}
        >
          <DatePicker showTime className="w-full" />
        </Form.Item>
        <Form.Item
          label="Loại game"
          name="gameTypeId"
          rules={[{ required: true, message: 'Vui lòng chọn loại game' }]}
        >
          <Select className="w-full">
            <Option value={1}>Shake game</Option>
            <Option value={2}>Quiz realtime</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Chiến dịch"
          name="campaignId"
          rules={[{ required: true, message: 'Vui lòng nhập ID chiến dịch' }]}
        >
          <Select className="w-full">
            {campaigns.map(campaign => (
              <Option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Tạo game
          </Button>
        </Form.Item>
      </Form>
    </CentralizedSubMenu>
  );
};

export default CreateGame;
