import React, { useState, useRef, useEffect } from "react";
import styles from './menu.module.css';

const ArrowMenu = ({
    name, state, index, setState
}) => {

    return (<>
    
    {
        state == index ? (
            <div className = {`${styles.progress} ${styles.current}`}
                >
                {name}
            </div>
        ) : (
        index < state ? (
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