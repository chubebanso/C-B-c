import React, { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";
import { Layout, Row, Col, Typography, message } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const GamePage = () => {
  const [players, setPlayers] = useState(() => {
    // Load dữ liệu từ localStorage khi trang tải
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers
      ? JSON.parse(savedPlayers)
      : [
          { id: 1, name: "Linh Thức", money: 100, avatar: "/linhthuc.jpg" },
          { id: 2, name: "Nam", money: 100, avatar: "/nam.jpeg" },
          { id: 3, name: "Hường Hoa", money: 100, avatar: "/huong.jpeg" },
          { id: 4, name: "Phương", money: 100, avatar: "/phuong.jpg" },
        ];
  });

  const [lastWinnerId, setLastWinnerId] = useState(null); // Lưu người bấm "Win" gần nhất

  // Lưu dữ liệu vào localStorage mỗi khi players thay đổi
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);
  const handleEditMoney = (playerId, newMoney) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, money: newMoney } : player
      )
    );
    message.success("Cập nhật số tiền thành công!");
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
      message.success("Tải ảnh lên thành công!");
    };
    reader.readAsDataURL(file);
  };

  const handleEat = (playerId) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      const eater = updatedPlayers.find((player) => player.id === playerId);
      let source;

      if (playerId === 4) {
        source = updatedPlayers.find((player) => player.id === 3);
      } else if (playerId === 1) {
        source = updatedPlayers.find((player) => player.id === 4);
      } else {
        source = updatedPlayers.find((player) => player.id === playerId - 1);
      }

      if (eater && source && source.money > 0) {
        source.money -= 1;
        eater.money += 1;
        message.info(`${eater.name} đã ăn và lấy 1 tiền từ ${source.name}!`);
      } else {
        message.warning("Nguồn tiền không đủ để ăn!");
      }

      return updatedPlayers;
    });
  };

  const handleWin = (playerId) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      const winner = updatedPlayers.find((player) => player.id === playerId);

      if (winner) {
        updatedPlayers.forEach((player) => {
          if (player.id !== playerId && player.money >= 2) {
            player.money -= 2;
            winner.money += 2;
          } else if (player.id !== playerId && player.money < 2) {
            winner.money += player.money;
            player.money = 0;
          }
        });

        setLastWinnerId(playerId); // Cập nhật người bấm "Win" gần nhất
        message.success(
          `${winner.name} đã Thắng và nhận tiền từ tất cả người chơi!`
        );
      }

      return updatedPlayers;
    });
  };

  const handleBurn = (playerId) => {
    if (lastWinnerId === null) {
      message.warning("Không có người bấm Win nào gần đây để chuyển tiền!");
      return;
    }

    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      const burner = updatedPlayers.find((player) => player.id === playerId);
      const lastWinner = updatedPlayers.find(
        (player) => player.id === lastWinnerId
      );

      if (burner && lastWinner && burner.money > 0) {
        lastWinner.money += 2; // Chuyển toàn bộ tiền của người bấm "Cháy" sang người "Win"
        burner.money -= 2; // Đặt tiền của người bấm "Cháy" về 0
        message.success(
          `${burner.name} đã Cháy và toàn bộ tiền được chuyển cho ${lastWinner.name}!`
        );
      } else {
        message.warning("Không có tiền để chuyển!");
      }

      return updatedPlayers;
    });
  };
  const handleVictory = (playerId) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      const winner = updatedPlayers.find((player) => player.id === playerId);

      if (winner) {
        updatedPlayers.forEach((player) => {
          if (player.id !== playerId && player.money >= 5) {
            player.money -= 5;
            winner.money += 5;
          } else if (player.id !== playerId && player.money < 5) {
            winner.money += player.money;
            player.money = 0;
          }
        });

        message.success(
          `${winner.name} đã Ù và nhận tiền từ tất cả người chơi!`
        );
      }

      return updatedPlayers;
    });
  };
  return (
    <Layout>
      <Header
        style={{ background: "#001529", color: "white", padding: "10px" }}
      >
        <Title level={3} style={{ color: "white", textAlign: "center" }}>
          Phỏm Online
        </Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <div className="card-container">
          {players.map((player) => (
            <PlayerCard
              player={player}
              onEat={() => handleEat(player.id)}
              onWin={() => handleWin(player.id)}
              onBurn={() => handleBurn(player.id)} // Thêm logic nút Cháy
              onVictory={() => handleVictory(player.id)}
              onUpload={handleUpload}
              onEditMoney={(id, newMoney) => handleEditMoney(id, newMoney)}
            />
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default GamePage;
