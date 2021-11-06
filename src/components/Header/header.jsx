import React, { useState, useRef, useEffect } from "react";
import styles from './header.module.css';
import UserInfo from "../UserInfo/userinfo";

const Header = ({state, setState}) => {  
    return (
        <div className = {styles.header}>
            <div className={styles.logo}>
                GLACE
            </div>
        </div>
        
      );
  }

export default Header;