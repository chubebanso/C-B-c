import React, { useState } from "react";
import LocPlayerCard from "./LocPlayerCard";
import { Layout, Typography, message, Modal, Input } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const LocPage = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "Lâm", money: 100, avatar: "/lam.jpg" },
    { id: 2, name: "Thái Dúi", money: 100, avatar: "/thai.jpg" },
    { id: 3, name: "Học 9", money: 100, avatar: "/hoc.jpg" },
    { id: 4, name: "Linh Dũng", money: 100, avatar: "/linhdung.jpg" },
  ]);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [cardsRemaining, setCardsRemaining] = useState({});
  const [winnerId, setWinnerId] = useState(null);

  const handleBurn = (playerId) => {
    message.info(`${players.find((p) => p.id === playerId).name} đã Cháy!`);
  };

  const handleWin = (playerId) => {
    setWinnerId(playerId);
    setIsWinModalOpen(true);
  };

  const handleSubmitWin = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id !== winnerId) {
          const cardsLeft = parseFloat(cardsRemaining[player.id]) || 0;
          return {
            ...player,
            money: player.money - cardsLeft * 0.5,
          };
        } else {
          const totalGain = Object.values(cardsRemaining).reduce(
            (sum, cards) => sum + (parseFloat(cards) || 0) * 0.5,
            0
          );
          return {
            ...player,
            money: player.money + totalGain,
          };
        }
      })
    );

    message.success("Kết quả được cập nhật!");
    setIsWinModalOpen(false);
    setCardsRemaining({});
  };

  const handleEditName = (playerId, newName) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, name: newName } : player
      )
    );
    message.success("Tên đã được cập nhật!");
  };

  const handleEditMoney = (playerId, newMoney) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, money: newMoney } : player
      )
    );
    message.success("Số tiền đã được cập nhật!");
  };

  const handleUpload = (playerId, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerId
            ? { ...player, avatar: e.target.result }
            : player
        )
      );
      message.success("Ảnh đã được tải lên!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      <Header
        style={{ background: "#001529", color: "white", padding: "10px" }}
      >
        <Title level={3} style={{ color: "white", textAlign: "center" }}>
          Lốc Online
        </Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <div className="card-container">
          {players.map((player) => (
            <LocPlayerCard
              key={player.id}
              player={player}
              onWin={() => handleWin(player.id)}
              onBurn={() => handleBurn(player.id)}
              onEditName={handleEditName}
              onEditMoney={handleEditMoney}
              onUpload={handleUpload}
            />
          ))}
        </div>

        {/* Modal nhập số bài còn lại */}
        <Modal
          title="Nhập số bài còn lại"
          open={isWinModalOpen}
          onOk={handleSubmitWin}
          onCancel={() => setIsWinModalOpen(false)}
        >
          {players
            .filter((player) => player.id !== winnerId)
            .map((player) => (
              <div key={player.id} style={{ marginBottom: "10px" }}>
                <label>{player.name}</label>
                <Input
                  type="number"
                  placeholder="Số bài còn lại"
                  onChange={(e) =>
                    setCardsRemaining((prev) => ({
                      ...prev,
                      [player.id]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
        </Modal>
      </Content>
    </Layout>
  );
};

export default LocPage;
