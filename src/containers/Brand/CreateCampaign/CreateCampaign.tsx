import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  message,
  Radio,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import coreClient from 'service/core';

const { TextArea } = Input;
const { Option } = Select;

interface CampaignFormData {
  name: string;
  imageUrl: string;
  description: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  status: string;
}

const CreateCampaign: React.FC = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>(
    'https://picsum.photos/200/300'
  );
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
  const history = useHistory();
  // Xử lý đăng kí chiến dịch
  const onFinish = async (values: CampaignFormData) => {
    try {
      const token = localStorage.getItem('access-token');
      if (!token) {
        message.error('Vui lòng đăng nhập để thực hiện chức năng này');
        return;
      }
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        name: values.name,
        imageUrl,
        startDate: values.startDate.toISOString().split('Z')[0],
        endDate: values.endDate.toISOString().split('Z')[0],
        status: values.status,
        description: values.description,
      };

      console.log('form data:', data);

      const response = await coreClient.post('/campaigns/create', data, header);
      if (response.status === 200) {
        message.success('Campaign created successfully.');
        setTimeout(() => {
          history.push('/event/manage');
        }, 2000);
      } else if (response.status === 500) {
        message.error(
          'Error creating campaign due to system cause. Please try again later.'
        );
      }
      console.log(response.data);
      form.resetFields();
    } catch (error) {
      message.error('Error creating campaign');
    }
  };

  const handleUpload = async (info: any) => {
    if (info.file.status === 'done') {
      // Assuming the server returns the URL of the uploaded image
      setImageUrl(info.file.response.url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <CentralizedSubMenu title="Tạo chiến dịch quảng bá thương hiệu">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
      >
        <Form.Item
          label="Tên chiến dịch"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên chiến dịch' }]}
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
        <Form.Item label="Phương thức tải ảnh" name="uploadMethod">
          <Radio.Group
            onChange={e => setUploadMethod(e.target.value)}
            value={uploadMethod}
          >
            <Radio value="url">URL</Radio>
            <Radio value="upload">Tải lên</Radio>
          </Radio.Group>
        </Form.Item>
        {uploadMethod === 'url' ? (
          <Form.Item label="URL hình ảnh" name="imageUrl">
            <Input />
          </Form.Item>
        ) : (
          <Form.Item label="Tải ảnh lên" name="upload">
            <Upload
              name="file"
              action="/api/upload"
              listType="picture"
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>
        )}
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
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Tạo chiến dịch
          </Button>
        </Form.Item>
      </Form>
    </CentralizedSubMenu>
  );
};

export default CreateCampaign;
