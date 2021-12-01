import React, { useState, useRef, useEffect } from "react";
import Canvas from "./SeatLayout/canvas";
import styles from './selectSeat.module.css';
import Button from 'react-bootstrap/Button';

// datas
import seatInfo from "../data/seatInfo";
import seatReservationInfo from "../data/seat-reservation";

const SelectSeat = ({ 
    state, setState, showInfo, selectedSeat, setSelectedSeat
    }) => {
    const [peopleNum, setPeopleNum] = useState(0);

    const onClickPrevBtn = () => {
        setState(state - 1);
    }
    const onClickNextBtn = () => {
        setState(state + 1);
    }
    
    const increment = async() => {
        setPeopleNum(peopleNum + 1);
    }
  
    const decrement = async() => {
        if (selectedSeat.length > 0 && peopleNum <= selectedSeat.length) {
            alert("선택한 좌석수가 인원수보다 많습니다");
        } else if (peopleNum > 0) {
            setPeopleNum(peopleNum - 1);
        }
    }

    
    return (
        <div>
        <div className = {styles.seat}>
            <div className = {styles.panelWindow}>
            <div className = {styles.seatInfo}>
                <img src={showInfo.img}/>
                <div className={styles.text}>
                <b>{showInfo.name}</b> 
                <div className={styles.info}>
                    <p>장소: {showInfo.place}</p>
                    <p>시간: {showInfo.period}</p>
                </div>
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
                seatInfo = {seatInfo}
                seatReservationInfo = {seatReservationInfo}
                peopleNum = {peopleNum}
                selectedSeat = {selectedSeat}
                setSelectedSeat = {setSelectedSeat} />
        </div>
         <Button className = {styles.prevBtn} onClick={onClickPrevBtn}>이전</Button>
         <Button className = {styles.nextBtn} onClick={onClickNextBtn}>다음</Button>
         </div>
    );
}

export default SelectSeat;