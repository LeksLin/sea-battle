import React, { useEffect, useState } from "react";
import cl from './app.module.css';
import PoleConclusion from "./PoleConclusion/PoleConclusion";
import {shipGeneration} from './middleware/shipGeneration';

function App() {
  let indexWinUser = 0;
  let indexWinPK = 0;

  let arrUser = [];
  let arrPK = [];
  

  const [shipsStateUser, setShipsStateUser] = useState([]);
  const [shipsStatePK, setShipsStatePK] = useState([]);

  const [shotUser, setShotUser] = useState({});
  const [shotPK, setShotPK] = useState({});

  const Refresh = () => {
    setShipsStateUser(shipGeneration());
    setShipsStatePK(shipGeneration());
  }
  console.log(`Пользователь:\n[${shipsStateUser}]`);
  console.log(`ПК:\n[${shipsStatePK}]`);

  const clickUser = (el) => {
    shotRegistration(shipsStateUser, el, arrUser, indexWinUser, shotUser, setShotUser);
  }

  const clickPK = (el) => {
    shotRegistration(shipsStatePK, el, arrPK, indexWinPK, shotPK, setShotPK);
  }

  const shotRegistration = (shipsState, el, arr, indexWin, shot, setShot) => {
    if(arr.indexOf(+el.target.id) == -1){
      let bool = false;
      shipsState.forEach(e => {
        e.forEach(element => {
          if(element == +el.target.id){
            indexWin++;
            bool = true;
          }
        })
      })
      arr.push(+el.target.id);
      console.log(`${bool ? 'Ранел' : 'Мимо'} ${el.target.id}`)
      setShot({...shot, shot: +bool, id: +el.target.id});
    }else{
      console.log('Уже стрелял')
    }
    if(indexWin == 20){
      console.log("Победа");
    }
  }

  return (
    <div className="App">
      <button onClick={Refresh} type="button">Клик</button>
      <PoleConclusion ships={shipsStateUser} />
      <PoleConclusion onClick={clickPK} ships={shipsStatePK} shot={shotPK}/>
    </div>
  );
}

export default App;
