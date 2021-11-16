import React, { useState, useRef, useEffect } from "react";
import styles from "./panel.module.css";
import SelectShow from "../SelectShow/selectShow";
import SelectSeat from "../SelectSheat/selectSeat";
import ReservationCheck from "../ReservationCheck/reservationCheck";
import ReservationDone from "../ReservationDone/reservationDone";
import Menu from "../Menu/menu";

const Panel = ({ 
    state,
    }) => {
    return (
    <div className={styles.panel}>
        
        {
        state == 0 && <SelectShow />
        }
        {
            state == 1 && <SelectSeat />
        }
        {
            state == 2 && <ReservationCheck />
        }
        {
            state == 3 && <ReservationDone />
        }
    </div>
    );
}

export default Panel;