import React from "react";
import { Button } from "antd";
import "./LandingPage.css";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <Button
        type="primary"
        size="large"
        className="start-button"
        onClick={() => navigate("/game")}
        classNames="phom"
      >
        Phỏm
      </Button>
      <Button
        type="primary"
        size="large"
        className="start-button"
        onClick={() => navigate("/loc")}
        style={{ marginTop: "20px" }}
      >
        Lốc
      </Button>
    </div>
  );
};

export default LandingPage;
