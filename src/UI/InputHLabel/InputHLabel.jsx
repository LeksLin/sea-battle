import React from "react";
import cl from './InputHLabel.module.css';

const InputHLabel = ({placeholder, onChange, value}) => {
    return (
        <div className={cl.input_container}>
            <input className={cl.input} type="text" placeholder=" " onChange={onChange} value={value}/>
            <div className={cl.cut}></div>
            <label className={cl.placeholder}>{placeholder}</label>
        </div>
    )
}

export default InputHLabel;