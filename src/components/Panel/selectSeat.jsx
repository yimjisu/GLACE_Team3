import React, { useState, useRef, useEffect } from "react";
import SeatLayout from "../SeatLayout/seatLayout";
import styles from "./panel.module.css";

const SelectSeat = ({ 
    }) => {
    return (
        <div className={styles.panelWindow}>
            <SeatLayout/>
        </div>
    );
}

export default SelectSeat;