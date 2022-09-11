import React, { useState } from "react";
import Button from "../UI/Button/Button";
import InputHLabel from '../UI/InputHLabel/InputHLabel';
import cl from './InputName.module.css';

const InputName = ({startGameInputs, setStartGameInputs}) => {
    const startGame = () => {
        console.log(startGameInputs.user.length)
        if(startGameInputs.user.length){
            setStartGameInputs(oldInput => ({...oldInput, start: true}));
        }
    }

    return (
        <div className={cl.form}>
            <div className={cl.title}>Введите имена игроков</div>
            <div className={cl.ic2}>
                <InputHLabel placeholder={'Ваше Имя'} onChange={e => setStartGameInputs(oldInput => ({...oldInput, user: e.target.value}))} value={startGameInputs.user}/>
            </div>
            <div className={cl.ic2}>
                <InputHLabel placeholder={'Имя противника'} onChange={e => setStartGameInputs(oldInput => ({...oldInput, pk: e.target.value}))} value={startGameInputs.pk}/>
            </div>
            <Button onClick={startGame}>Начать</Button>
        </div>
    )
}

export default InputName;