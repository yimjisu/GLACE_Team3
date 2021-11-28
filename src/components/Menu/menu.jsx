import React, { useState, useRef, useEffect } from "react";
import styles from './menu.module.css';
import ArrowMenu from "./arrowMenu";


const Menu = ({state, setState}) => {  
    const menus = ['공연 선택', '좌석 선택', '개인정보 입력', '예약완료'];
    return (
      <>
        <div className = {styles.background}></div>
        <div className={styles.tab}>
          { menus.map ( (value, index) =>
              <ArrowMenu 
                name = {value}
                index = {index}
                state = {state}
                setState = {setState}
              />
          )}
        </div>
        </>
      );
  }

export default Menu;