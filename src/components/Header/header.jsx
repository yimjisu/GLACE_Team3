import React, { useState, useRef, useEffect } from "react";
import styles from './header.module.css';
const Header = ({state, setState}) => {  

    const onClickBtn = () => {
        setState(4);
    }

    return (
        <div className = {styles.header}>
            <div className={styles.logo}>
                <b>GLACE</b>
                <input className={styles.btn} type="button" value="예약 확인하기" onClick={onClickBtn}></input>
            </div>
        </div>
        
      );
  }

export default Header;