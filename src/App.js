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

  const [shotUser, setShotUser] = useState([]);
  const [shotPK, setShotPK] = useState([]);

  const [cashComponent, setCashComponent] = useState([]);
  let supCashComponent = [];

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
      setShot(oldShot => [...oldShot, {shot: +bool, id: +el.target.id}]);
    }else{
      console.log('Уже стрелял')
    }
    if(indexWin == 20){
      console.log("Победа");
    }
  }

  let boolCash = false;

  useEffect(() => {
    setCashComponent(supCashComponent);
  }, [boolCash]);

  kubPool();
  function kubPool(){
        let indexEl = 0;
        let bool = true;
        for(let i = 1; i <= 100; i++){
            if(i%10 == 1 && bool) {
                i--;
                indexEl++;
                bool = false;
            }
            if(i%10 == 1 || bool) bool = true;
            supCashComponent.push({id : bool ? i : 0, idEl: indexEl, shot: 2, shipItem: 0});
            // console.log({id : bool ? i : 0, idEl: indexEl, shot: 2}, i, bool);
        }
        boolCash = true;
    }

  return (
    <div className="App">
      <button onClick={Refresh} type="button">Клик</button>
      {/* <PoleConclusion ships={shipsStateUser} /> */}
      <PoleConclusion 
        onClick={clickPK} 
        ships={shipsStatePK} 
        shot={shotPK} 
        supCashComponent={supCashComponent}
        cashComponent={cashComponent}
        setCashComponent={setCashComponent}
      />
    </div>
  );
}

export default App;
