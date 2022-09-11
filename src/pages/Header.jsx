import React from "react";
import Button from "../UI/Button/Button";
import cl from './Header.module.css';

const Header = ({props}) => {
    const {startGameInputs, killShips, disabled, chekRaund, Refresh} = props;
    return (
        <div className={cl.header}>
            <div className={cl.headerUser}>
                <div>{startGameInputs.user}</div>
                <div>{killShips.user}</div>
            </div>
            <div className={cl.headerBTN}>
                {disabled 
                    ? <div className={cl.chekRaund}>{chekRaund}</div>
                    : <Button disabled={disabled} onClick={Refresh} type="button">Новая игра</Button>
                }
            </div>
            <div className={cl.headerPK}>
                <div>{killShips.pk}</div>
                <div>{startGameInputs.pk.length ? startGameInputs.pk : 'PK'}</div>
            </div>
        </div>
    )
}

export default Header;