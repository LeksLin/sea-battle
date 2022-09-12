import React, { useState, useEffect } from "react";
import PoleConclusion from "../PoleConclusion/PoleConclusion";
import {shipGeneration} from '../middleware/shipGeneration';
import {PKLogic} from '../middleware/PKLogic';
import {shotRegistration} from '../middleware/shotRegistration';
import cl from './GamePole.module.css';
import Button from "../UI/Button/Button";
import Header from './Header';

const GamePole = ({startGameInputs}) => {

    const [disabled, setDisabled] = useState(true);
    const [chekRaund, setChekRaund] = useState('Ваш ход')
    // Все выстрелы
    const [arrUser, setArrUser] = useState([]);
    const [arrPK, setArrPK] = useState([]);

    // Запрещенные клики 
    const [shipsForbiddenUser, setShipsForbiddenUser] = useState([]);
    const [shipsForbiddenPK, setShipsForbiddenPK] = useState([]);
    
    // Размещение кораблей
    const [shipsStateUser, setShipsStateUser] = useState([]);
    const [shipsStatePK, setShipsStatePK] = useState([]);

    const [shipsAliveUser, setShipsAliveUser] = useState([[1,1,1,1],[1,1,1],[1,1,1],[1,1],[1,1],[1,1],[1],[1],[1],[1]]);
    const [shipsAlivePK, setShipsAlivePK] = useState([[1,1,1,1],[1,1,1],[1,1,1],[1,1],[1,1],[1,1],[1],[1],[1],[1]]);

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

    useEffect(() => {
        setChekRaund(ochered ? 'Ваш ход' : 'Ход противника');
    }, [ochered])

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
        const {shipsUser, shipsForbiddenUser} = shipGeneration('shipsUser', 'shipsForbiddenUser');
        setShipsForbiddenUser(shipsForbiddenUser);
        setShipsStateUser(shipsUser);
        const {shipsPK, shipsForbiddenPK} = shipGeneration('shipsPK', 'shipsForbiddenPK');
        setShipsForbiddenPK(shipsForbiddenPK);
        setShipsStatePK(shipsPK);
    }, []);

    const Refresh = () => {
        console.log(arrUser, arrPK);
        setArrUser([]);
        setArrPK([]);
        console.log(shipsStateUser, shipsStatePK);

        const {shipsUser, shipsForbiddenUser} = shipGeneration('shipsUser', 'shipsForbiddenUser');
        setShipsForbiddenUser(shipsForbiddenUser);
        setShipsStateUser(shipsUser);

        const {shipsPK, shipsForbiddenPK} = shipGeneration('shipsPK', 'shipsForbiddenPK');
        setShipsForbiddenPK(shipsForbiddenPK);
        setShipsStatePK(shipsPK);

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

    useEffect(() => {
        console.log(shipsAlivePK)
            shipsAlivePK.forEach((e, i) => {
                if(i == 0){
                    console.log(`4 палубный ${e.indexOf(1) >= 0 ? 'жив' : 'мертв'}`);
                    // if(e.indexOf(1) < 0) setArrPK(oldArrPK => [...oldArrPK, ...shipsForbiddenPK[i]]);
                }else if(i <= 2){
                    console.log(`3 палубный ${e.indexOf(1) >= 0 ? 'жив' : 'мертв'}`);
                    // if(e.indexOf(1) < 0) setArrPK(oldArrPK => [...oldArrPK, ...shipsForbiddenPK[i]]);
                }else if(i <= 5){
                    console.log(`2 палубный ${e.indexOf(1) >= 0 ? 'жив' : 'мертв'}`);
                    // if(e.indexOf(1) < 0) setArrPK(oldArrPK => [...oldArrPK, ...shipsForbiddenPK[i]]);
                }else if(i <= 9){
                    console.log(`1 палубный ${e.indexOf(1) >= 0 ? 'жив' : 'мертв'}`);
                    // if(e.indexOf(1) < 0) setArrPK(oldArrPK => [...oldArrPK, ...shipsForbiddenPK[i]]);
                }
            })
    }, [shipsAlivePK])

    useEffect(() => {
        console.log(shipsAliveUser)
        shipsAliveUser.forEach((e, i) => {
                if(i == 0){
                    console.log(`4 палубный ${e.indexOf(1) >= 0 ? 'жив' : 'мертв'}`);
                    if(e.indexOf(1) < 0) setArrUser(oldArrUser => [...oldArrUser, ...shipsForbiddenUser[i]]);
                }else if(i <= 2){
                    console.log(`3 палубный ${e.indexOf(1) >= 0 ? 'жив' : 'мертв'}`);
                    if(e.indexOf(1) < 0) setArrUser(oldArrUser => [...oldArrUser, ...shipsForbiddenUser[i]]);
                }else if(i <= 5){
                    console.log(`2 палубный ${e.indexOf(1) >= 0 ? 'жив' : 'мертв'}`);
                    if(e.indexOf(1) < 0) setArrUser(oldArrUser => [...oldArrUser, ...shipsForbiddenUser[i]]);
                }else if(i <= 9){
                    console.log(`1 палубный ${e.indexOf(1) >= 0 ? 'жив' : 'мертв'}`);
                    if(e.indexOf(1) < 0) setArrUser(oldArrUser => [...oldArrUser, ...shipsForbiddenUser[i]]);
                }
            })
    }, [shipsAliveUser])

    
    
    const clickPK = (el) => {
        console.log(ochered)
        if(ochered && disabled){
            let bool = shotRegistration(shipsStatePK, +el.target.id, arrPK, setArrPK, setShotPK);
            shipsStatePK.forEach((e, i) => {
                e.forEach((el, ind) => {
                    if(el){
                        shotPK.forEach(elem => {
                            if(elem.shot){
                                if(elem.id == el){
                                    setShipsAlivePK(oldShipsAlivePK => [...oldShipsAlivePK.slice(0, i), [...oldShipsAlivePK[i].slice(0, ind), 0, ...oldShipsAlivePK[i].slice(ind + 1)], ...oldShipsAlivePK.slice(i + 1)]);
                                }
                            }
                        })
                    }
                })
            })

            shipsStateUser.forEach((e, i) => {
                e.forEach((el, ind) => {
                    if(el){
                        shotUser.forEach(elem => {
                            if(elem.shot){
                                if(elem.id == el){
                                    setShipsAliveUser(oldShipsAliveUser => [...oldShipsAliveUser.slice(0, i), [...oldShipsAliveUser[i].slice(0, ind), 0, ...oldShipsAliveUser[i].slice(ind + 1)], ...oldShipsAliveUser.slice(i + 1)]);
                                }
                            }
                        })
                    }
                })
            })
            
            if(bool != 2){
                setOchered(0);
                setTimeout(PKLogic, 200, PKLogicObj);

            }
        }
    }

    // console.log(shipsStateUser);

    const headerInf = {startGameInputs, killShips, disabled, chekRaund, Refresh};
    return (
        <div className={cl.Game}>
            <Header props={headerInf} />
            <div className={cl.mainPole}>
                <div className={cl.poleUser}>
                    <div className={ochered ? cl.opacityPole : ''}>
                        <PoleConclusion 
                            // onClick={clickUser}
                            ships={shipsStateUser} 
                            shot={shotUser} 
                            cashComponent={cashComponentUser}
                            setCashComponent={setCashComponentUser}
                        />
                    </div>
                </div>
                <div className={cl.polePK}>
                    <div className={!ochered ? cl.opacityPole : ''}>
                        <PoleConclusion 
                            onClick={clickPK} 
                            // ships={shipsStatePK} 
                            shot={shotPK} 
                            cashComponent={cashComponentPK}
                            setCashComponent={setCashComponentPK}
                        />
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default GamePole;