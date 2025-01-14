import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';

interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  imagePath: string | null;
}

const CampaignManagement: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Dữ liệu minh họa
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Chiến dịch 1',
        description: 'Mô tả chiến dịch 1',
        startDate: '2025-01-01T12:30:00',
        endDate: '2025-01-30T12:30:00',
        status: 'On going',
        imagePath: 'https://picsum.photos/300/200',
      },
      {
        id: '2',
        name: 'Chiến dịch 2',
        description: 'Mô tả chiến dịch 2',
        startDate: '2025-02-01T12:30:00',
        endDate: '2025-02-28T12:30:00',
        status: 'Completed',
        imagePath: 'https://picsum.photos/300/200',
      },
      {
        id: '3',
        name: 'Chiến dịch 3',
        description: 'Mô tả chiến dịch 3',
        startDate: '2025-03-01T12:30:00',
        endDate: '2025-03-30T12:30:00',
        status: 'Pending',
        imagePath: 'https://picsum.photos/200/300',
      },
    ];

    setCampaigns(mockCampaigns);
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
                  src={
                    campaign.imagePath ||
                    'https://via.placeholder.com/300?text=No+Image'
                  }
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
              <Button type="default">
                <Link to={`/campaigns/${campaign.id}/vouchers`}>
                  Xem voucher
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </CentralizedSubMenu>
  );
};

export default CampaignManagement;

// import React, { useEffect, useState } from 'react';
// import { Card, Button } from 'antd';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';

// interface Campaign {
//   id: string;
//   name: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   status: string;
// }

// const CampaignManagement: React.FC = () => {
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const response = await axios.get('/api/campaigns');
//         setCampaigns(response.data);
//       } catch (error) {
//         console.error('Error fetching campaigns:', error);
//       }
//     };

//     fetchCampaigns();
//   }, []);

//   return (
//     <CentralizedSubMenu title="Quản lý chiến dịch">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {campaigns.map(campaign => (
//           <Card key={campaign.id} title={campaign.name} className="shadow-md">
//             <p>{campaign.description}</p>
//             <p>Ngày bắt đầu: {new Date(campaign.startDate).toLocaleString()}</p>
//             <p>Ngày kết thúc: {new Date(campaign.endDate).toLocaleString()}</p>
//             <p>Trạng thái: {campaign.status}</p>
//             <div className="flex justify-between mt-4">
//               <Button type="primary">
//                 <Link to={`/campaigns/edit/${campaign.id}`}>Chỉnh sửa</Link>
//               </Button>
//               <Button type="default">
//                 <Link to={`/campaigns/${campaign.id}/vouchers`}>Xem voucher</Link>
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </CentralizedSubMenu>
//   );
// };

// export default CampaignManagement;
