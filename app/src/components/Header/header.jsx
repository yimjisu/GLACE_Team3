import React, { useState, useRef, useEffect } from "react";
import styles from './header.module.css';
import Button from 'react-bootstrap/Button';
import {State} from '../Panel/panel'

const Header = ({state, setState}) => {
    const onClickLogo = () => {
        setState(State.SelectShow);
    }
    
    const onClickBtn = () => {
        setState(State.UserInfo);
    }
    
    useEffect(() => {
        console.log(state);
      },[state]);
  
    return (
        <div className = {styles.header}>
            <div className={styles.logo}>
                <div className={styles.logo2} onClick={() => {onClickLogo();}} style={{cursor:'pointer'}}>GLACE</div>
                <div class={styles.line}>|</div>
                <input className={styles.btn} type="button" value="예약 확인하기" onClick={onClickBtn}></input>
            </div>
        </div>
        
      );
  }

export default Header;