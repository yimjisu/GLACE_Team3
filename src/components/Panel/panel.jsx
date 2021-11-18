import React, { useState, useRef, useEffect } from "react";
import styles from "./panel.module.css";
import SelectShow from "../SelectShow/selectShow";
import SelectSeat from "../SelectSheat/selectSeat";
import ReservationCheck from "../ReservationCheck/reservationCheck";
import ReservationDone from "../ReservationDone/reservationDone";
import Menu from "../Menu/menu";
import UserInfo from "../UserInfo/userinfo"

const Panel = ({ 
    state, setState
    }) => {
        
    const [showInfo, setShowInfo] = useState(null);
    return (
    <div className={styles.panel}>
        {
        state == 0 && <SelectShow state={state} setState={setState} setShowInfo={setShowInfo}/>
        }
        {
            state == 1 && <SelectSeat state={state} setState={setState}  showInfo={showInfo}/>
        }
        {
            state == 2 && <ReservationCheck state={state} setState={setState}  showInfo={showInfo}/>
        }
        {
            state == 3 && <ReservationDone state={state} setState={setState} showInfo={showInfo}/>
        }
        {
            state == 4 && <UserInfo />
        }
    </div>
    );
}

export default Panel;