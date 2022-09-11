import React from "react";
import cl from './Button.module.css';

const Button = ({children, ...prop}) => {
    children = children || 'Напишите текст';
    return (
        <div className={cl.linkDiv}>
            <div {...prop}  className={`${cl.link}`}>
                {children}
            </div>
        </div>
    )
}

export default Button;