import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';
import React, { useState, useEffect } from 'react';
import { Card, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import coreClient from 'service/core';

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
              <Button type="primary">
                <Link to={`/campaigns/edit/${campaign.id}`}>Chỉnh sửa</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </CentralizedSubMenu>
  );
};

export default CampaignManagement;
