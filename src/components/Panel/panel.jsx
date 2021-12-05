import React, { useState, useRef, useEffect } from "react";
import styles from "./panel.module.css";
import SelectShow from "../SelectShow/selectShow";
import SelectSeat from "../SelectSheat/selectSeat";
import ReservationCheck from "../ReservationCheck/reservationCheck";
import ReservationDone from "../ReservationDone/reservationDone";
import Menu from "../Menu/menu";
import UserInfo from "../UserInfo/userinfo"
import ReservationInfo from "../reservationInfo/reservationInfo";

export const State = {
    SelectShow : 0,
    SelectSeat : 1,
    ReservationCheck : 2,
    ReservationDone : 3,
    UserInfo : 4,
    ReservationInfo : 5,
}


const Panel = ({ 
    state, setState
    }) => {
        
    const [showInfo, setShowInfo] = useState(null);
    const [selectedShowInfo, setSelectedShowInfo] = useState({});
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [userReservationInfo, setUserReservationInfo] = useState([]);

    useEffect(() => {
        console.log(selectedShowInfo);
    }, [selectedShowInfo])
    return (
    <div className={styles.panel}>
        {
        state == State.SelectShow && <SelectShow state={state} setState={setState} setShowInfo={setShowInfo} setSelectedShowInfo={setSelectedShowInfo}/>
        }
        {
            state == State.SelectSeat && <SelectSeat state={state} setState={setState}  showInfo={showInfo} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}  selectedShowInfo={selectedShowInfo} setSelectedShowInfo={setSelectedShowInfo}/>
        }
        {
            state == State.ReservationCheck && <ReservationCheck state={state} setState={setState} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} selectedShowInfo={selectedShowInfo} setUserInfo={setUserInfo}/>
        }
        {
            state == State.ReservationDone && <ReservationDone state={state} setState={setState} selectedSeat={selectedSeat} selectedShowInfo={selectedShowInfo} userInfo = {userInfo}/>
        }
        {
            state == State.UserInfo && <UserInfo setState={setState} setUserReservationInfo={setUserReservationInfo}/>
        }
        {
            state == State.ReservationInfo && <ReservationInfo setState={setState} userReservationInfo={userReservationInfo}/>
        }
    </div>
    );
}

export default Panel;