import React, { useEffect, useState } from "react";
import cl from './PoleConclusion.module.css';

const PoleConclusion = ({onClick, ships = [], shot, cashComponent, setCashComponent}) => {
    let sechek = 1;
    // console.log(`Кэш:`, cashComponent);

    useEffect(() => {
        shipOut();
    }, [ships]);

    function shipOut () {
        if(ships.length){
            ships.forEach(el => {
                el.forEach(element => {
                    setCashComponent(oldCash => oldCash.map(item => {
                        return (
                            item.id == element 
                            ? {...item, shipItem: 1}
                            : item
                        )
                    }))
                })
            })
        }
    }

    useEffect(() => {
        setCashComponent(oldCash => oldCash.map(item => {
            return (
                Object.keys(shot).length 
                ? item.id == shot[shot.length - 1].id 
                    ? {...item, shot: shot[shot.length - 1].shot }
                    : item
                : item
            )
        }))
    }, [shot]);

    // Отрисовка всего поля
    const generationPole = (e, i) => {
        if(e.id == 0){
            return generationPoleNumber(sechek++);
        }else{
            return generationPoleGame(e);
        }
    }

    // Отрисовка цифр сбоку
    const generationPoleNumber = (id) => {
        return (
            <div key={id + 'number'} className={cl.colomnLetter}>{id}</div>
        )
    }

    // Отрисовка игрового поля
    const generationPoleGame = ({id, shot, shipItem}) => {
        return (
            <div key={id}  className={cl.test1}>
                <div 
                    onClick={onClick} 
                    id={id} 
                    className={`
                        ${cl.itemPole} 
                        ${shipItem ? cl.fonCubeShip : cl.fonCube /* Отрисовка кораблей */} 
                        ${shot == 1 ? cl.shotShipYES : "" /* Отрасовка попаданий */} 
                    `}
                ></div>
                <div 
                    className={`
                        ${shot < 2 ? shot == 1 ? cl.shotYES : cl.shotNO : ""/* Отрасовка попаданий */} 
                    `}
                ></div>
            </div>
            
        )
    }

    return (
        <div className={`${cl.conteiner}`}>
            <div></div>
            <div className={cl.colomnLetter}>А</div>
            <div className={cl.colomnLetter}>Б</div>
            <div className={cl.colomnLetter}>В</div>
            <div className={cl.colomnLetter}>Г</div>
            <div className={cl.colomnLetter}>Д</div>
            <div className={cl.colomnLetter}>Е</div>
            <div className={cl.colomnLetter}>Ж</div>
            <div className={cl.colomnLetter}>З</div>
            <div className={cl.colomnLetter}>И</div>
            <div className={cl.colomnLetter}>К</div>
            {cashComponent.map(generationPole)}
        </div>
    )
}

export default PoleConclusion;