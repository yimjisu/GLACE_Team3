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
    const [selectedSeat, setSelectedSeat] = useState([]);

    return (
    <div className={styles.panel}>
        {
        state == State.SelectShow && <SelectShow state={state} setState={setState} setShowInfo={setShowInfo}/>
        }
        {
            state == State.SelectSeat && <SelectSeat state={state} setState={setState}  showInfo={showInfo} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>
        }
        {
            state == State.ReservationCheck && <ReservationCheck state={state} setState={setState}  showInfo={showInfo} selectedSeat={selectedSeat}/>
        }
        {
            state == State.ReservationDone && <ReservationDone state={state} setState={setState} showInfo={showInfo} selectedSeat={selectedSeat}/>
        }
        {
            state == State.UserInfo && <UserInfo state={state} setState={setState} showInfo={showInfo}/>
        }
        {
            state == State.ReservationInfo && <ReservationInfo state={state} setState={setState} showInfo={showInfo}/>
        }
    </div>
    );
}

export default Panel;