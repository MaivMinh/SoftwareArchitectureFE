import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { message, Button, Card } from 'antd';
import coreClient from 'service/core';
import CentralizedSubMenu from 'components/shared/CentralizedSubMenu';

const Game: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const response = await coreClient.get(`/campaigns/${id}/games`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          message.error('Lỗi khi lấy dữ liệu game');
          return;
        }

        if (response.status === 200) {
          //   console.log('game data fetch:', response);
          setGames(response.data.data);
          message.success('Lấy dữ liệu game thành công');
        }
      } catch (error) {
        message.error('Có lỗi xảy ra, vui lòng thử lại sau');
      }
    };
    fetchGames();
  }, []);
  return (
    <CentralizedSubMenu title="Quản lý game">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {games.length > 0 &&
          games.map(game => (
            <Card
              key={game.id}
              title={`Game ID: ${game.id}`}
              className="shadow-md"
            >
              <p>
                Cho phép trao đổi mảnh ghép:{' '}
                {game.allowPiecesExchange ? 'Có' : 'Không'}
              </p>
              <p>
                Thời gian bắt đầu: {new Date(game.startAt).toLocaleString()}
              </p>
              <p>Loại game ID: {game.gameTypeId}</p>
              <p>Chiến dịch ID: {game.campaignId}</p>
              <div className="flex justify-between mt-4">
                <Button type="primary">
                  <Link to={`/games/edit/${game.id}`}>Chỉnh sửa</Link>
                </Button>
              </div>
            </Card>
          ))}

        {games.length === 0 && <p>Không có game nào</p>}
      </div>
    </CentralizedSubMenu>
  );
};

export default Game;
