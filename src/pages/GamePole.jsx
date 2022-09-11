import React, { useState, useEffect } from "react";
import PoleConclusion from "../PoleConclusion/PoleConclusion";
import {shipGeneration, getRandomInt} from '../middleware/shipGeneration';
import {PKLogic} from '../middleware/PKLogic';
import {shotRegistration} from '../middleware/shotRegistration';
import cl from './GamePole.module.css';
import Button from "../UI/Button/Button";

const GamePole = ({startGameInputs}) => {

    const [disabled, setDisabled] = useState(true);
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

    // Осталось кораблей
    const [killShips, setKillShips] = useState({user: 20, pk: 20})

    let supCashComponent = [];

    let boolCash = false;

    const [ochered, setOchered] = useState(1);

    // Данные для логики пк
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
        setShotUser,
        setOchered
    }


    // Регистрация Побед
    useEffect(() => winRegistration(
        shotUser, 
        setKillShips, 
        'user', 
        startGameInputs.pk.length ? startGameInputs.pk : 'PK'
    ), [shotUser]);
    useEffect(() => winRegistration(
        shotPK, 
        setKillShips, 
        'pk', 
        startGameInputs.user
    ), [shotPK]);

    // Заполнение поля
    useEffect(() => {
        if(boolCash){
            setCashComponentUser(supCashComponent);
            setCashComponentPK(supCashComponent);
            boolCash = false;
        }
        
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

    const winRegistration = (shot, setKillShips, userPK, winUserPK) => {
        let index = 0;
        shot.forEach(e => {
            if(e.shot) index++;
        })
        // console.log(`Убитых кораблей PK: ${index}`);
        if(index == 20){
            setKillShips(oldKillShips => ({...oldKillShips, [userPK]: 'Победа ' + winUserPK}));
            setDisabled(false);
        }else{
            setKillShips(oldKillShips => ({...oldKillShips, [userPK]: 20 - index}))
        }
    }

    useEffect(() => {
        setShipsStateUser(shipGeneration());
        setShipsStatePK(shipGeneration());
    }, []);

    const Refresh = () => {
        console.log(arrUser, arrPK);
        setArrUser([]);
        setArrPK([]);
        console.log(shipsStateUser, shipsStatePK);
        setShipsStateUser(shipGeneration());
        setShipsStatePK(shipGeneration());
        console.log(shotUser, shotPK);
        setShotUser([]);
        setShotPK([]);
        setCashComponentUser(supCashComponent);
        setCashComponentPK(supCashComponent);

        setShotRobotYes(0);
        setDirection({left: 1, top: 0, right: 0, bottom: 0});
        setArrShot([]);
        setDisabled(true);
    }

    const clickUser = (el) => {
        shotRegistration(shipsStateUser, +el.target.id, arrUser, setArrUser, setShotUser);
    }

    
    
    const clickPK = (el) => {
        console.log(ochered)
        if(ochered){
            let bool = shotRegistration(shipsStatePK, +el.target.id, arrPK, setArrPK, setShotPK);
            setOchered(0);
            if(bool != 2){
                setTimeout(PKLogic, 2000, PKLogicObj);
            }
        }
    }

    return (
        <div>
            <div className={cl.header}>
                <div className={cl.headerUser}>
                    <div>{startGameInputs.user}</div>
                    <div>{killShips.user}</div>
                </div>
                <div className={cl.headerBTN}>
                    <Button disabled={disabled} onClick={Refresh} type="button">Новая игра</Button>
                </div>
                <div className={cl.headerPK}>
                    <div>{killShips.pk}</div>
                    <div>{startGameInputs.pk.length ? startGameInputs.pk : 'PK'}</div>
                </div>
            </div>
            <div className={cl.mainPole}>
                <div className={cl.poleUser}>
                    <PoleConclusion 
                        // onClick={clickUser}
                        ships={shipsStateUser} 
                        shot={shotUser} 
                        cashComponent={cashComponentUser}
                        setCashComponent={setCashComponentUser}
                    />
                </div>
                <div className={cl.polePK}>
                    <PoleConclusion 
                        onClick={clickPK} 
                        ships={shipsStatePK} 
                        shot={shotPK} 
                        cashComponent={cashComponentPK}
                        setCashComponent={setCashComponentPK}
                    />
                </div>
            </div>
            
        </div>
        
    )
}

export default GamePole;