import React, { useState } from 'react';
import { Form, Input, Button, Switch, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fpsEndpoint } from 'service/fps';
import './CreateGameTypes.css';
import coreClient from 'service/core';

const { TextArea } = Input;

const CreateGameTypes: React.FC = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleUploadImage = async (info: any) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const imageUrl = info.file.response.url;
      setImageUrl(imageUrl);
      form.setFieldsValue({ imageUrl });
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSubmit = async (values: any) => {
    if (values.imageUrl === null || values.imageUrl === '') {
      message.error('Failed to upload image. Try again');
      return;
    }

    try {
      const payload = {
        name: values.name,
        isRealtime: values.isRealtime,
        imageUrl: values.imageUrl,
        instruction: values.instruction,
      };

      console.log(payload);

      // Call API to create new game type
      await coreClient.post('/game-types/create', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      message.success('Game type created successfully');
      form.resetFields();
    } catch (error) {
      console.error('Failed to create game type:', error);
      message.error('Failed to create game type');
    }
  };

  return (
    <div className="form-container mt-[10px]">
      <h2 className="text-center">Add New Game Type</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="custom-form px-[100px] py-[40px] ml-[10%]"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="isRealtime" label="Real-time" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[{ required: true, message: 'Please choose an image!' }]}
        >
          <Input value={imageUrl} readOnly />
        </Form.Item>
        <Form.Item label="Upload Image">
          <Upload
            name="file"
            action={`${fpsEndpoint}/upload`} // Replace with your upload URL
            listType="picture"
            onChange={handleUploadImage}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="instruction"
          label="Instruction"
          rules={[{ required: true, message: 'Please input the instruction!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateGameTypes;
