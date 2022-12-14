import React from "react";
import Button from "../UI/Button/Button";
import InputHLabel from '../UI/InputHLabel/InputHLabel';
import cl from './InputName.module.css';

const InputName = ({startGameInputs, setStartGameInputs}) => {
    const startGame = () => {
        if(startGameInputs.user.length){
            setStartGameInputs(oldInput => ({...oldInput, start: true}));
        }
    }

    return (
        <div className={cl.InputNameMain}>
            <div className={cl.form}>
                <div className={cl.title}>Введите имена игроков</div>
                <div className={cl.ic2}>
                    <InputHLabel placeholder={'Ваше Имя'} onChange={e => setStartGameInputs(oldInput => ({...oldInput, user: e.target.value}))} value={startGameInputs.user}/>
                </div>
                <div className={cl.ic2}>
                    <InputHLabel placeholder={'Имя противника'} onChange={e => setStartGameInputs(oldInput => ({...oldInput, pk: e.target.value}))} value={startGameInputs.pk}/>
                </div>
                <div className={cl.BTNContainer}>
                    <div className={cl.BTN}>
                        <Button onClick={startGame}>Начать</Button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default InputName;