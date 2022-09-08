import React, { useEffect, useState } from "react";
import cl from './PoleConclusion.module.css';

const PoleConclusion = ({boolState, index, ships}) => {
    console.log(boolState,index, typeof(ships));
    let arr = [1,2,3,4,5,6,7,8,9,10];

    const click = (e) => {
        console.log(e.target.id);
    }

    const poleOutput = (e) => {
        let shipBool = false;
        let bool = e == 10;
        index += bool ? 10 : 0;
        let id = e + (bool ? index - 10 : index);
        for(let i = 0; i < ships.length; i++){
            for(let j = 0; j < ships[i].length; j++){
                if(ships[i][j] == id) shipBool = true;
            }
        }
        // console.log(shipBool, id, ships)
        return (
            <div 
                onClick={click} 
                key={id} 
                id={id} 
                className={`${cl.itemPole} ${shipBool ? cl.fonCubeShip : cl.fonCube}`}
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
            <div className={cl.colomnLetter}>1</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
            <div className={cl.colomnLetter}>2</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
            <div className={cl.colomnLetter}>3</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
            <div className={cl.colomnLetter}>4</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
            <div className={cl.colomnLetter}>5</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
            <div className={cl.colomnLetter}>6</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
            <div className={cl.colomnLetter}>7</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
            <div className={cl.colomnLetter}>8</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
            <div className={cl.colomnLetter}>9</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
            <div className={cl.colomnLetter}>10</div>
            {boolState ? arr.map(poleOutput) : arr.map(poleOutput)}
        </div>
    )
}

export default PoleConclusion;