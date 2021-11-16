import React, { useState, useRef, useEffect } from "react";
import InputNumber from "./inputNumber";
import SeatLayout from "./SeatLayout/seatLayout";
import styles from './selectSeat.module.css';

const SelectSeat = ({ 
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
    
    return (
        <div className = {styles.panelWindow}>
            <div className = {styles.seat}>
                <div className = {styles.peopleNum}>
                    {
                        num.map((value, index) => {
                            return <InputNumber 
                                name = {name}
                                index = {index} 
                                num = {num}
                                setNum = {setNum} />;
                        })
                    }
                </div>
            <SeatLayout 
            className = {styles.seatLayout}
            seats = {seats}/>
            </div>
            <div className = {styles.seatInfo}>
                Seat Info
            </div>
        </div>
    );
}

export default SelectSeat;