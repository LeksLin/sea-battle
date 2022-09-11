import React, { useState, useEffect } from "react";
import PoleConclusion from "../PoleConclusion/PoleConclusion";
import {shipGeneration, getRandomInt} from '../middleware/shipGeneration';
import {PKLogic} from '../middleware/PKLogic';
import {shotRegistration} from '../middleware/shotRegistration';

const GamePole = () => {
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

    let supCashComponent = [];

    let boolCash = false;



    const [shotRobotYes, setShotRobotYes] = useState(0);
    const [direction, setDirection] = useState({left: 1, top: 0, right: 0, bottom: 0})
    
    let left = direction.left, top = direction.top, right = direction.right, bottom = direction.bottom;
    const [arrShot, setArrShot] = useState([]);

    const PKLogicObj = {
        shotRobotYes,
        setShotRobotYes,
        direction,
        setDirection,
        left,
        top,
        right,
        bottom,
        arrShot,
        setArrShot,
        shipsStateUser,
        arrUser,
        setArrUser,
        setShotUser
    }


    // Регистрация Побед
    useEffect(() => winRegistration(shotUser), [shotUser]);
    useEffect(() => winRegistration(shotPK), [shotPK]);

    useEffect(() => {
        setCashComponentUser(supCashComponent);
        setCashComponentPK(supCashComponent);
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

    const winRegistration = (shot) => {
        let index = 0;
        shot.forEach(e => {
            if(e.shot) index++;
        })
        // console.log(`Убитых кораблей PK: ${index}`);
        if(index == 20) alert('Победа');
    }

    useEffect(() => {
        setShipsStateUser(shipGeneration());
        setShipsStatePK(shipGeneration());
    }, []);

    const Refresh = () => {
        setShipsStateUser(shipGeneration());
        setShipsStatePK(shipGeneration());
    }

    const clickUser = (el) => {
        shotRegistration(shipsStateUser, +el.target.id, arrUser, setArrUser, setShotUser);
    }

    const clickPK = (el) => {
        let bool = shotRegistration(shipsStatePK, +el.target.id, arrPK, setArrPK, setShotPK);
        if(bool != 2){
            PKLogic(PKLogicObj);
        }
    }

    return (
        <div>
            
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
                ships={shipsStatePK} 
                shot={shotPK} 
                cashComponent={cashComponentPK}
                setCashComponent={setCashComponentPK}
            />
        </div>
        
    )
}

export default GamePole;