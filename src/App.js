import React, { useState } from "react";
import LandingPage from "./LandingPage.js";
import GamePage from "./GamePage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LocPage from "./LocPage.js";

function App() {
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái để điều hướng giữa LandingPage và GamePage

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/loc" element={<LocPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
