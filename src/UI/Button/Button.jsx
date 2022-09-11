import React from "react";
import cl from './Button.module.css';

const Button = ({children, disabled, ...prop}) => {
    children = children || 'Напишите текст';
    return (
        <div className={cl.linkDiv}>
            <button disabled={disabled} {...prop}  className={`${cl.link} ${disabled ? '' : cl.line}`}>
                {children}
            </button>
        </div>
    )
}

export default Button;