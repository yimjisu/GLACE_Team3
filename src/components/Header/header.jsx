import React, { useState, useRef, useEffect } from "react";
import styles from './header.module.css';
import ArrowMenu from "./arrowMenu";

const Header = ({state, setState}) => {  

    const menus = ['공연 선택', '좌석 선택', '예약 확인', '예약완료'];


    return (
        <div className={styles.tab}>
          { menus.map ( (value, index) =>
              <ArrowMenu 
                name = {value}
                index = {index}
                selected = {index == state}
                setState = {setState}
              />
          )}
        </div>
      );
  }

export default Header;