import React, { useState, useRef, useEffect } from "react";
import Canvas from "./SeatLayout/canvas";
import styles from './selectSeat.module.css';
import Button from 'react-bootstrap/Button';

const SelectSeat = ({ 
    state, setState, showInfo
    }) => {
    const onClickPrevBtn = () => {
        setState(state - 1);
    }
    const onClickNextBtn = () => {
        setState(state + 1);
    }

    const [peopleNum, setPeopleNum] = useState(0);
    
    const increment = () => {
        setPeopleNum(peopleNum + 1)
    }
  
    const decrement = () => {
        if (peopleNum > 0) {
            setPeopleNum(peopleNum - 1)
        }
    }

    
    return (
        <div>
        <div className = {styles.seat}>
            <div className = {styles.panelWindow}>
            <div className = {styles.seatInfo}>
                <b>{showInfo.name}</b> 
                <div className={styles.info}>
                    <br/>장소: {showInfo.place}<br/>기간: {showInfo.period}
                </div>
            </div>
                <div className = {styles.peopleNum}>
                    <p className = {styles.name}>인원수</p>
                    <div className={styles.inputNumber}>
                    <div
                        className = {styles.btn}
                        type="button" onClick={decrement}>
                        &minus; </div>
                    <span>{peopleNum}</span>
                    <div 
                        className = {styles.btn}
                        type="button" onClick={increment}>
                        &#43;</div>     
                    </div>
                </div>
            </div>
            <Canvas 
                className = {styles.seatLayout}
                peopleNum = {peopleNum}/>
        </div>
         <Button className = {styles.prevBtn} onClick={onClickPrevBtn}>이전</Button>
         <Button className = {styles.nextBtn} onClick={onClickNextBtn}>다음</Button>
         </div>
    );
}

export default SelectSeat;