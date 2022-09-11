import React, { useEffect, useState } from "react";
import cl from './app.module.css';

import {shipGeneration, getRandomInt} from './middleware/shipGeneration';

import InputName from "./pages/InputName";
import GamePole from "./pages/GamePole";

function App() {
  // Начало игры
  const [startGameInputs, setStartGameInputs] = useState({user: '', pk: '', start: false});

  return (
    <div className="App">
      {
        !startGameInputs.start 
        ? <InputName startGameInputs={startGameInputs} setStartGameInputs={setStartGameInputs} />
        : <GamePole/>
      }
    </div>
  );
}

export default App;