import React, { useEffect, useState } from "react";
import cl from './app.module.css';
import PoleConclusion from "./PoleConclusion/PoleConclusion";
import {shipGeneration} from './middleware/shipGeneration';

function App() {
  
  let index = 0;
  let arr = [];

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

  const clickUser = (el) => {
    
    if(arr.indexOf(+el.target.id) == -1){
      let bool = false;
      shipsStateUser.forEach(e => {
        e.forEach(element => {
          if(element == +el.target.id){
            bool = true;
          }
        })
      })
      arr.push(+el.target.id);
      console.log(`${bool ? 'Ранел' : 'Мимо'} ${el.target.id}`)
    }else{
      console.log('Уже стрелял')
    }
  }

  const clickPK = (el) => {
    console.log(shipsStatePK, el.target.id);
    shipsStatePK.forEach(e => {
      if(e == +el.target.id){
        console.log('Ранел', el.target.id);
      }
    })
  }

  return (
    <div className="App">
      <button onClick={Refresh} type="button">Клик</button>
      <PoleConclusion onClick={clickUser} boolState={boolState} index={index} ships={shipsStateUser} />
      <PoleConclusion onClick={clickPK} boolState={boolState} index={index} ships={shipsStatePK} />
    </div>
  );
}

export default App;
