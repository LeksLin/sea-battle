import React, { useEffect, useState } from "react";
import cl from './app.module.css';
import PoleConclusion from "./PoleConclusion/PoleConclusion";
import {shipGeneration, getRandomInt} from './middleware/shipGeneration';

function App() {
  // Все выстрелы
  const [arrUser, setArrUser] = useState([]);
  const [arrPK, setArrPK] = useState([]);
  
  // Размещение кораблей
  const [shipsStateUser, setShipsStateUser] = useState([]);
  const [shipsStatePK, setShipsStatePK] = useState([]);

  // Сохранение попадений и промахов
  const [shotUser, setShotUser] = useState([]);
  const [shotPK, setShotPK] = useState([]);

  // Набор данных по игровым полям
  const [cashComponentUser, setCashComponentUser] = useState([]);
  const [cashComponentPK, setCashComponentPK] = useState([]);
  //Вспомогательный массив
  let supCashComponent = [];

  let boolCash = false;

  // Регистрация Побед
  useEffect(() => winRegistration(shotUser), [shotUser]);
  useEffect(() => winRegistration(shotPK), [shotPK]);

  const winRegistration = (shot) => {
    let index = 0;
    shot.forEach(e => {
      if(e.shot) index++;
    })
    console.log(`Убитых кораблей PK: ${index}`);
    if(index == 20) alert('Победа');
  }

  // Генерация кораблей
  const Refresh = () => {
    setShipsStateUser(shipGeneration());
    setShipsStatePK(shipGeneration());
  }
  console.log(`Пользователь:\n[${shipsStateUser}]`);
  console.log(`ПК:\n[${shipsStatePK}]`);

  // Клики по игровому полю
  const clickUser = (el) => {
    shotRegistration(shipsStateUser, +el.target.id, arrUser, setArrUser, setShotUser);
  }
  const clickPK = (el) => {
    shotRegistration(shipsStatePK, +el.target.id, arrPK, setArrPK, setShotPK);
    PKLogic();
  }

  // Регистрация попаданий
  const shotRegistration = (shipsState, id, arr, setArr, setShot) => {
    let bool = false;
    console.log(arr);
    if(arr.indexOf(id) == -1){
      shipsState.forEach(e => {
        if(e.indexOf(id) != -1) bool = true;
      })
      setArr(oldsetArr => [...oldsetArr, id])
      console.log(`${bool ? 'Ранел' : 'Мимо'} ${id}`)
      setShot(oldShot => [...oldShot, {shot: +bool, id: id}]);
    }else{
      return true;
    }
    return false;
  }

  useEffect(() => {
    setCashComponentUser(supCashComponent);
    setCashComponentPK(supCashComponent);
  }, [boolCash]);

  // Создание информации игрового поля
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









    const PKLogic = () => {
      let bool = true;
      while(bool){
        const PKAtack = getRandomInt(100);
        bool = shotRegistration(shipsStateUser, PKAtack, arrUser, setArrUser, setShotUser);
      }
    }




  return (
    <div className="App">
      <button onClick={Refresh} type="button">Клик</button>
      <PoleConclusion 
        onClick={clickUser}
        ships={shipsStateUser} 
        shot={shotUser} 
        cashComponent={cashComponentUser}
        setCashComponent={setCashComponentUser}
      />
      <PoleConclusion 
        onClick={clickPK} 
        ships={shipsStatePK} 
        shot={shotPK} 
        cashComponent={cashComponentPK}
        setCashComponent={setCashComponentPK}
      />
    </div>
  );
}

export default App;