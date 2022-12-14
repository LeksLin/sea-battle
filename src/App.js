import React, { useEffect, useState } from "react";
import cl from './app.module.css';

import {shipGeneration, getRandomInt} from './middleware/shipGeneration';

import InputName from "./pages/InputName";
import GamePole from "./pages/GamePole";

function App() {
  // Начало игры
  const [startGameInputs, setStartGameInputs] = useState({user: '', pk: '', start: false});

  return (
    <div className={cl.App}>
      {
        !startGameInputs.start 
        ? <InputName startGameInputs={startGameInputs} setStartGameInputs={setStartGameInputs} />
        : <GamePole startGameInputs={startGameInputs}/>
      }
    </div>
  );
}

export default App;