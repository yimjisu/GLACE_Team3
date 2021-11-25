import React, { useState, useRef, useEffect } from "react";
import styles from './menu.module.css';

const ArrowMenu = ({
    name, state, index, setState
}) => {
    const onClickMenu = (index) => {
        setState(index);
    }

    return (<>
    
    {
        state == index ? (
            <div className = {`${styles.progress} ${styles.current}`}
                onClick = {() => onClickMenu(index)}>
                {name}
            </div>
        ) : (
        index < state ? (
            <div className = {`${styles.progress} ${styles.previous}`}
                onClick = {() => onClickMenu(index)}>
                {name}
            </div>
        ) : (
            <div className = {`${styles.progress}`}
                onClick = {() => onClickMenu(index)}>
                {name}
            </div>
        ))
    }
    </>);
}

export default ArrowMenu;