import React, { useState, useEffect } from 'react';
import { Card, Button, message, Modal, Form, Input, InputNumber } from 'antd';
import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';
import coreClient from 'service/core';

interface Voucher {
  id: string;
  name: string;
  value: number;
  imageUrl: string;
  description: string;
  brandId: number;
}

const VoucherManagement: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchVouchers = async () => {
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
          `/voucher-types?brandId=${brandId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const vouchersData = response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            value: item.value,
            imageUrl: item.imageUrl,
            description: item.description,
            brandId: item.brandId,
          }));

          // console.log('vouchersData:', vouchersData);
          setVouchers(vouchersData);
          message.success('Lấy dữ liệu voucher thành công');
        } else {
          message.error('Lỗi khi lấy dữ liệu voucher');
        }
      } catch (error) {
        message.error('Có lỗi xảy ra, vui lòng thử lại sau');
      }
    };

    fetchVouchers();
  }, []);
  const showModal = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    form.setFieldsValue(voucher);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedVoucher(null);
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('vales updata voucher', values);
      const token = localStorage.getItem('access-token');
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await coreClient.patch(
        `/voucher-types/${selectedVoucher?.id}`,
        values,
        header
      );
      console.log('response update voucher:', response);
      if (response.status === 200) {
        setVouchers(
          vouchers.map(v =>
            v.id === selectedVoucher?.id ? { ...v, ...values } : v
          )
        );
        message.success('Cập nhật voucher thành công');
        setIsModalVisible(false);
        setSelectedVoucher(null);
      } else {
        message.error('Lỗi khi cập nhật voucher');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };
  return (
    <CentralizedSubMenu title="Quản lý voucher">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {vouchers.length > 0 ? (
          vouchers.map(voucher => (
            <Card
              key={voucher.id}
              title={voucher.name}
              className="shadow-md rounded-xl"
              cover={
                <div className="h-48 w-full overflow-hidden">
                  <img
                    alt={voucher.name}
                    src={voucher.imageUrl}
                    className="object-cover h-full w-full p-2"
                  />
                </div>
              }
            >
              <p>
                Giá trị: {voucher.value * 100} {'%'}
              </p>
              <p>{voucher.description}</p>
              <div className="flex justify-end mt-4">
                <Button type="primary" onClick={() => showModal(voucher)}>
                  <p>Chỉnh sửa</p>
                </Button>
                {/* <Button onClick={() => handleDelete(voucher.id)}>Xóa</Button> */}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center ">Không có voucher nào được tìm thấy</p>
        )}
      </div>
      <Modal
        title="Chỉnh sửa voucher"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên voucher"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên voucher' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá trị"
            name="value"
            rules={[{ required: true, message: 'Vui lòng nhập giá trị' }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </CentralizedSubMenu>
  );
};

export default VoucherManagement;
