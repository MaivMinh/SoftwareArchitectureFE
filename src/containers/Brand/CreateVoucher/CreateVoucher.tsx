import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Upload, message, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';
import coreClient from 'service/core';
import { useHistory } from 'react-router-dom';

const { TextArea } = Input;

interface VoucherFormData {
  name: string;
  value: number;
  imageUrl: string;
  description: string;
  brandId: number;
}

const CreateVoucher: React.FC = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>(
    'https://picsum.photos/400/400'
  );
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
  const history = useHistory();

  const onFinish = async (values: VoucherFormData) => {
    try {
      const token = localStorage.getItem('access-token');
      if (!token) {
        message.error('Vui lòng đăng nhập để thực hiện chức năng này');
        return;
      }
      const accountId = JSON.parse(localStorage.getItem('profile') || '{}').id;
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        name: values.name,
        value: values.value,
        imageUrl: values.imageUrl ? values.imageUrl : imageUrl,
        description: values.description,
        brandId: accountId,
      };

      console.log('form data voucher:', data);
      const response = await coreClient.post(
        '/voucher-types/create',
        data,
        header
      );
      console.log('response voucher:', response);
      if (response.status === 200) {
        message.success('Tạo voucher thành côngcông');
        setTimeout(() => {
          history.push('/voucher/manage');
        }, 2000);
        form.resetFields();
      } else if (response.status === 500) {
        message.error('Lỗi hệ thống, vui lòng thử lại sau.');
      }
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
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
    <CentralizedSubMenu title="Tạo voucher mới">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
      >
        <Form.Item
          label="Tên voucher"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên voucher' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá trị (%). Ví dụ: 30"
          name="value"
          rules={[{ required: true, message: 'Vui lòng nhập giá trị' }]}
        >
          <InputNumber min={0} className="w-full" />
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
          <Form.Item
            label="URL hình ảnh"
            name="imageUrl"
            rules={[{ message: 'Vui lòng nhập URL hình ảnh' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Form.Item
            label="Tải ảnh lên"
            name="upload"
            rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh' }]}
          >
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
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Tạo voucher
          </Button>
        </Form.Item>
      </Form>
    </CentralizedSubMenu>
  );
};

export default CreateVoucher;
