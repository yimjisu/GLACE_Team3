import React, { useState, useRef, useEffect } from "react";
import styles from './menu.module.css';
import { State } from '../Panel/panel';

const ArrowMenu = ({
    name, state, index, setState
}) => {
    
    return (<>
    
    {
        index < state ? (
            <div className = {`${styles.progress} ${styles.current}`}
                >
                {name}
            </div>
        ) : (
        index == state ? (
            <div className = {`${styles.progress} ${styles.previous}`}
                >
                {name}
            </div>
        ) : (
            <div className = {`${styles.progress}`}
                >
                {name}
            </div>
        ))
    }
    </>);
}

export default ArrowMenu;