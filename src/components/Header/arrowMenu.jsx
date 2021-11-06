import React, { useState, useRef, useEffect } from "react";
import styles from './header.module.css';

const ArrowMenu = ({
    name, selected, index, setState
}) => {

    const onClickMenu = (index) => {
        console.log(index);
        setState(index);
      }
    return (<>
    {
        !selected ? (
            <div className = {styles.progress}
            onClick = {() => onClickMenu(index)}>
                {name}
            </div>
        ) : (
            <div className = {styles.selectedProgress}
            onClick = {() => onClickMenu(index)}>
                {name}
            </div>
        )
    }
    </>);
}

export default ArrowMenu;