import React, { useState, useRef, useEffect } from "react";
import styles from './reservationInfo.module.css';
import {State} from '../Panel/panel'
import Button from 'react-bootstrap/Button';

const ReservationInfo = ({ 
    state, setState, showInfo
    }) => {


    const total_num = 5; //서버에서 받아오는 예약 개수

    const [num, setNum] = useState(0);

    String.prototype.format = function() {
        var formatted = this;
        for( var arg in arguments ) {
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };

    const changeInfo = () => {
        document.getElementById("head_info").innerHTML = num + 1;
        // document.getElementById("img").src = "";
        // document.getElementById("name").innerHTML = "";
        // document.getElementById("place").innerHTML = "";
        // document.getElementById("date").innerHTML = "";
        // document.getElementById("time").innerHTML = "";
        // document.getElementById("seat").innerHTML = "";
    }

    const onIncrease = () => {
        if (num + 1 < total_num) {
            setNum(num + 1);
            changeInfo();
        }
    }

    const onDecrease = () => {
        if (num > 0) {
            setNum(num - 1);
            changeInfo();
        }
    }

    const onClickBtn = () => {
        setState(State.SelectShow);
    }

    return (
        <div>
            <div className={styles.text}>예약 총 {total_num}건 (<span id="head_info">{num+1}</span>/{total_num})</div>
            <table className={styles.table}>
                <tr>
                    <td width="10%" align="center"><button className={styles.leftTriangle} onClick={onDecrease}></button></td>
                    <td width="40%" align="right">
                        <img className={styles.img} id="img" src="../images/poster1.jpg"/>
                    </td>
                    <td width="40%" align="left">
                        <div className={styles.userInfo}>
                            <p><b>공연&nbsp;&nbsp;</b><span id="name">아케인</span></p>
                            <p><b>장소&nbsp;&nbsp;</b><span id="place">교양분관</span></p>
                            <p><b>날짜&nbsp;&nbsp;</b><span id="date">2021.11.17(수)</span></p>
                            <p><b>시간&nbsp;&nbsp;</b><span id="time">20:00</span></p>
                            <p><b>좌석&nbsp;&nbsp;</b><span id="seat">C1, C2</span></p>
                        </div>
                    </td>
                    <td width="10%" align="center"><button className={styles.rightTriangle} onClick={onIncrease}></button></td>
                </tr>
                <tr height="100"></tr>
                <tr>
                    <td colspan="4" align="center"><Button onClick={onClickBtn}>처음으로</Button></td>
                </tr>
            </table>
        </div>
    );

}

export default ReservationInfo;