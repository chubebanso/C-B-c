import React, { useState } from "react";
import { Card, Button, Upload, Input, Modal, Typography } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import "./PlayerCard.css";

const { Title } = Typography;

function PlayerCard({
  player,
  onEat,
  onWin,
  onVictory,
  onUpload,
  onEditName,
  onBurn,
  onEditMoney,
}) {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false);
  const [newName, setNewName] = useState(player.name);
  const [newMoney, setNewMoney] = useState(player.money);

  // Xử lý chỉnh sửa tên
  const showNameModal = () => {
    setIsNameModalOpen(true);
  };

  const handleNameOk = () => {
    onEditName(player.id, newName);
    setIsNameModalOpen(false);
  };

  const handleNameCancel = () => {
    setIsNameModalOpen(false);
  };

  // Xử lý chỉnh sửa tiền
  const showMoneyModal = () => {
    setIsMoneyModalOpen(true);
  };

  const handleMoneyOk = () => {
    onEditMoney(player.id, parseFloat(newMoney)); // Cập nhật số tiền
    setIsMoneyModalOpen(false);
  };

  const handleMoneyCancel = () => {
    setIsMoneyModalOpen(false);
  };

  return (
    <Card className="player-card">
      {/* Tên và nút chỉnh sửa */}
      <div className="card-header">
        <Title level={5} className="player-name">
          {player.name}
        </Title>
        <EditOutlined className="edit-icon" onClick={showNameModal} />
      </div>

      {/* Avatar */}
      {player.avatar && (
        <img src={player.avatar} alt="Avatar" className="player-avatar" />
      )}

      {/* Tiền và nút chỉnh sửa */}
      <p className="player-money">
        Tiền: {player.money.toFixed(2)}{" "}
        <EditOutlined className="edit-icon" onClick={showMoneyModal} />
      </p>

      {/* Các nút thao tác */}
      <div className="button-group">
        <Button type="primary" className="button eat-button" onClick={onEat}>
          Ăn
        </Button>
        <Button type="primary" className="button win-button" onClick={onWin}>
          Thắng
        </Button>
        <Button
          type="primary"
          className="button victory-button"
          onClick={onVictory}
        >
          Ù
        </Button>
        <Button type="danger" className="button burn-button" onClick={onBurn}>
          Cháy
        </Button>
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            onUpload(player.id, file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />} className="button upload-button">
            Upload Ảnh
          </Button>
        </Upload>
      </div>

      {/* Modal chỉnh sửa tên */}
      <Modal
        title="Chỉnh sửa tên"
        open={isNameModalOpen}
        onOk={handleNameOk}
        onCancel={handleNameCancel}
      >
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nhập tên mới"
        />
      </Modal>

      {/* Modal chỉnh sửa tiền */}
      <Modal
        title="Chỉnh sửa tiền"
        open={isMoneyModalOpen}
        onOk={handleMoneyOk}
        onCancel={handleMoneyCancel}
      >
        <Input
          type="number"
          value={newMoney}
          onChange={(e) => setNewMoney(e.target.value)}
          placeholder="Nhập số tiền mới"
        />
      </Modal>
    </Card>
  );
}

export default PlayerCard;
