import React, { useState, useRef, useEffect } from "react";
import styles from './header.module.css';
import Button from 'react-bootstrap/Button';
const Header = ({state, setState}) => {
    const onClickLogo = () => {
        setState(0);
    }
    useEffect(() => {
        console.log(state);
      },[state]);
    return (
        <div className = {styles.header}>
            <div className={styles.logo}>
                <div className={styles.logo2} onClick={() => {onClickLogo();}} style={{cursor:'pointer'}}>GLACE</div>
            </div>
        </div>
        
      );
  }

export default Header;