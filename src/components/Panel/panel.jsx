import React, { useState, useRef, useEffect } from "react";
import styles from "./panel.module.css";

const Panel = ({ 
    }) => {
    return (
    <div className={styles.panel}>
        <div className={styles.panelWindow}></div>
    </div>
    );
}

export default Panel;