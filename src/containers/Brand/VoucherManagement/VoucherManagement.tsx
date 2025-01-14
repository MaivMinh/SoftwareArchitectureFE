import React, { useState, useEffect } from 'react';
import { Card, Button, message } from 'antd';
import { Link } from 'react-router-dom';
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

          console.log('vouchersData:', vouchersData);
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

  // const handleDelete = async (id: string) => {
  //   try {
  //     const response = await .delete(`/api/vouchers/${id}`);
  //     if (response.status === 200) {
  //       setVouchers(vouchers.filter(voucher => voucher.id !== id));
  //       message.success('Xóa voucher thành công');
  //     } else {
  //       message.error('Lỗi khi xóa voucher');
  //     }
  //   } catch (error) {
  //     message.error('Có lỗi xảy ra, vui lòng thử lại sau');
  //   }
  // };

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
                    src={
                      voucher.imageUrl ||
                      'https://via.placeholder.com/300?text=No+Image'
                    }
                    className="object-cover h-full w-full p-2"
                  />
                </div>
              }
            >
              <p>
                Giá trị: {voucher.value} {'%'}
              </p>
              <p>{voucher.description}</p>
              <div className="flex justify-between mt-4">
                <Button type="primary">
                  <Link to={`/vouchers/edit/${voucher.id}`}>Chỉnh sửa</Link>
                </Button>
                {/* <Button onClick={() => handleDelete(voucher.id)}>Xóa</Button> */}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center ">Không có voucher nào được tìm thấy</p>
        )}
      </div>
    </CentralizedSubMenu>
  );
};

export default VoucherManagement;
