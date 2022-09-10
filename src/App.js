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
    // console.log(`Убитых кораблей PK: ${index}`);
    if(index == 20) alert('Победа');
  }

  // Генерация кораблей
  const Refresh = () => {
    setShipsStateUser(shipGeneration());
    setShipsStatePK(shipGeneration());
  }
  // console.log(`Пользователь:\n[${shipsStateUser}]`);
  // console.log(`ПК:\n[${shipsStatePK}]`);

  // Клики по игровому полю
  const clickUser = (el) => {
    shotRegistration(shipsStateUser, +el.target.id, arrUser, setArrUser, setShotUser);
  }
  const clickPK = (el) => {
    let bool = shotRegistration(shipsStatePK, +el.target.id, arrPK, setArrPK, setShotPK);
    if(bool != 2){
      PKLogic();
    }
    
  }

  // Регистрация попаданий
  const shotRegistration = (shipsState, id, arr, setArr, setShot) => {
    let bool = 0;
    // console.log(arr);
    if(arr.indexOf(id) == -1){
      shipsState.forEach(e => {
        if(e.indexOf(id) != -1) bool = 1;
      })
      setArr(oldsetArr => [...oldsetArr, id])
      // console.log(`${bool ? 'Ранел' : 'Мимо'} ${id}`)
      setShot(oldShot => [...oldShot, {shot: +bool, id: id}]);
    }else{
      return 2;
    }
    return bool;
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







const [shotRobotYes, setShotRobotYes] = useState(0);
const [direction, setDirection] = useState({left: 1, top: 0, right: 0, bottom: 0})

let left = direction.left, top = direction.top, right = direction.right, bottom = direction.bottom;
const [arrShot, setArrShot] = useState([]);
const PKLogic = () => {
  if(shotRobotYes){
    let boolShot;
    if(left){
      let testShot = arrShot[arrShot.length - 1] - 1;
      console.log(`Атака Пк Проверка слева: ${testShot}`);
      let result = plannedAttack(testShot, testShot > 1 && testShot < 100 && testShot % 10);
      console.log(result);
      switch(result){
        case 0:
          setDirection(oldDirection => ({...oldDirection, left: 0, top: 1}));
          left = 0;
          top = 1;
          return;
        case 1:
          setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
          left = 1; 
          top = 0; 
          right = 0; 
          bottom = 0;
          return;
        case 2:
          setDirection(oldDirection => ({...oldDirection, left: 0, top: 1}));
          left = 0;
          top = 1;
      }
      
      console.log(left, top);
    }
    if(top){
      let testShot = arrShot[arrShot.length - 1] - 10;
      console.log(`Атака Пк Проверка сверху: ${testShot}`);
      let result = plannedAttack(testShot, testShot > 1 && testShot < 100);
      console.log(result);
      switch(result){
        case 0:
          setDirection(oldDirection => ({...oldDirection, top: 0, right: 1}));
          top = 0;
          right = 1;
          return;
        case 1:
          setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
          left = 1; 
          top = 0; 
          right = 0; 
          bottom = 0;
          return;
        case 2:
          setDirection(oldDirection => ({...oldDirection, top: 0, right: 1}));
          top = 0;
          right = 1;
      }
      console.log(top, right);
    }
    if(right){
      let testShot = arrShot[arrShot.length - 1] + 1;
      console.log(`Атака Пк Проверка справа: ${testShot}`);
      let result = plannedAttack(testShot, testShot > 1 && testShot < 100 && testShot % 10 != 1);
      console.log(result);
      switch(result){
        case 0:
          setDirection(oldDirection => ({...oldDirection, right: 0, bottom: 1}));
          right = 0;
          bottom = 1;
          return;
        case 1:
          setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
          left = 1; 
          top = 0; 
          right = 0; 
          bottom = 0;
          return;
        case 2:
          setDirection(oldDirection => ({...oldDirection, right: 0, bottom: 1}));
          right = 0;
          bottom = 1;
      }
      
      console.log(right, bottom);
    }
    if(bottom){
      let testShot = arrShot[arrShot.length - 1] + 10;
        console.log(`Атака Пк Проверка снизу: ${testShot}`);
        let result = plannedAttack(testShot, testShot > 1 && testShot < 100);
        console.log(result);
        switch(result){
          case 0:
            setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
            bottom = 0;
            right = 0;
            top = 0;
            left = 1;
            setShotRobotYes(0);
            RandomAtakPK();
          case 1:
            setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
            left = 1; 
            top = 0; 
            right = 0; 
            bottom = 0;
            return;
          case 2:
            setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
            bottom = 0;
            right = 0;
            top = 0;
            left = 1;
            setShotRobotYes(0);
            RandomAtakPK();
        }
        console.log(right, bottom);
      }
    }
    if(!shotRobotYes){
      RandomAtakPK();
    }
}


const RandomAtakPK = () => {
  let bool = 2;
  while(bool == 2){
    const PKAtack = getRandomInt(100);
    bool = shotRegistration(shipsStateUser, PKAtack, arrUser, setArrUser, setShotUser);
    console.log(`Рандомная атака: ${PKAtack}
      Результат атаки: ${bool < 2 
                        ? bool 
                          ? 'Ранел' 
                          : 'Мимо' 
                        : 'Уже стрелял'
                      }`
    );
    if(bool == 1){
      setShotRobotYes(bool);
      setArrShot(oldArrShot => [...oldArrShot, PKAtack]);
    }
  }
}

const plannedAttack = (testShot, examination) => {
  let boolShot;
  if(examination){
    boolShot = shotRegistration(shipsStateUser, testShot, arrUser, setArrUser, setShotUser);
    console.log(`Результат атаки: ${boolShot < 2 
                                    ? boolShot 
                                      ? 'Ранел' 
                                      : 'Мимо' 
                                    : 'Уже стрелял'
                                  } ${boolShot}`);
    if(boolShot == 0 || boolShot == 2){
      return boolShot;
    }
    if(boolShot == 1){
      setArrShot(oldArrShot => [...oldArrShot, testShot]);
      return boolShot;
    }
  }else{
    return 0;
    // setDirection(oldDirection => ({...oldDirection, [first]: 0, [second]: 1}));
  }
}



  return (
    <div className="App">
      <button onClick={Refresh} type="button">Клик</button>
      <PoleConclusion 
        // onClick={clickUser}
        ships={shipsStateUser} 
        shot={shotUser} 
        cashComponent={cashComponentUser}
        setCashComponent={setCashComponentUser}
      />
      <PoleConclusion 
        onClick={clickPK} 
        // ships={shipsStatePK} 
        shot={shotPK} 
        cashComponent={cashComponentPK}
        setCashComponent={setCashComponentPK}
      />
    </div>
  );
}

export default App;