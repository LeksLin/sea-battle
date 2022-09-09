import React, { useEffect, useState } from "react";
import cl from './app.module.css';
import PoleConclusion from "./PoleConclusion/PoleConclusion";
import {shipGeneration} from './middleware/shipGeneration';

function App() {
  
  let index = 0;

  const [shipsStateUser, setShipsStateUser] = useState([]);
  const [shipsStatePK, setShipsStatePK] = useState([]);
  const [boolState, setBoolState] = useState(false);
  const Refresh = () => {
    setBoolState(false);
    setShipsStateUser(shipGeneration());
    setShipsStatePK(shipGeneration());
    setBoolState(true);
  }
  console.log(`Пользователь:\n[${shipsStateUser}]`);
  console.log(`ПК:\n[${shipsStatePK}]`);

  return (
    <div className="App">
      <button onClick={Refresh} type="button">Клик</button>
      <PoleConclusion boolState={boolState} index={index} ships={shipsStateUser} />
      <PoleConclusion boolState={boolState} index={index} ships={shipsStatePK} />
    </div>
  );
}

export default App;
