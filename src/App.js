import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from "./components/Layout";
import NoPage from "./components/Nopage";
import Home from "./components/Home";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Board from "./board/Board"
import MainBoard from "./board/MainBoard";
import MapContainer from './components/MapContainer';
import Mypage from './components/Mypage';
import MainBoardIdx from './board/MainBoardIdx';
import Chat from './components/Chat'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="map" element={<MapContainer />} />
            <Route path="*" element={<NoPage />} />
            <Route path="mainboard" element={<MainBoard />} />
              <Route path="mainboard/*" element={<MainBoardIdx />} />
            <Route path="board" element={<Board />} />
            <Route path="mypage" element={<Mypage />} />
            <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
