import React, { useState, useRef, useEffect } from "react";
import InputNumber from "./inputNumber";
import Canvas from "./SeatLayout/canvas";
import styles from './selectSeat.module.css';
import Button from 'react-bootstrap/Button';

const SelectSeat = ({ 
    state, setState, showInfo
    }) => {
    const seats = [
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const [num, setNum] = useState([0, 0, 0]);
    const name = ['성인', '청소년', '유아'];

    
    const onClickPrevBtn = () => {
        setState(state - 1);
    }
    const onClickNextBtn = () => {
        setState(state + 1);
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
                    { num.map((value, index) => {
                        return <InputNumber 
                            name = {name}
                            index = {index} 
                            num = {num}
                            setNum = {setNum} />;
                    })}
                </div>
                
            
            </div>
            <Canvas 
            className = {styles.seatLayout}/>
        </div>
         <Button className = {styles.prevBtn} onClick={onClickPrevBtn}>이전</Button>
         <Button className = {styles.nextBtn} onClick={onClickNextBtn}>다음</Button>
         </div>
    );
}

export default SelectSeat;