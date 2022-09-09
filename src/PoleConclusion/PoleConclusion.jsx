import React, { useEffect, useState } from "react";
import cl from './PoleConclusion.module.css';

const PoleConclusion = ({onClick, ships, shot}) => {
    let arr = [1,2,3,4,5,6,7,8,9,10];
    let boolCash = false;
    let sechek = 1;
    console.log(shot);

    const [cashComponent, setCashComponent] = useState([]);
    console.log(`Кэш:`, cashComponent);
    let supCashComponent = [];

    useEffect(() => {
        setCashComponent(supCashComponent);
    }, [boolCash]);

    useEffect(() => {
        console.log('Изменение ships');
        cashComponent.forEach((e, i) => {
            
            ships.forEach(el => {
                el.forEach(element => {
                    if(e.id == element){
                        supCashComponent[i].shipItem = 1;
                    }
                })
            })
        })
        setCashComponent(supCashComponent);
        console.log(supCashComponent);
    }, [ships]);

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

    const generationPole = (e, i) => {
        if(e.id == 0){
            return generationPoleNumber(sechek++);
        }else{
            return generationPoleGame(e);
        }
    }

    const generationPoleNumber = (id) => {
        return (
            <div key={id + 'number'} className={cl.colomnLetter}>{id}</div>
        )
    }

    const generationPoleGame = ({id, shipItem}) => {
        return (
            <div 
                onClick={onClick} 
                key={id} 
                id={id} 
                className={`${cl.itemPole} ${shipItem ? cl.fonCubeShip : cl.fonCube}`}
            >{id}</div>
        )
    }

    return (
        <div className={cl.conteiner}>
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