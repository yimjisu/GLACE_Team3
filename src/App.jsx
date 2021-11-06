import logo from './logo.svg';
import React, { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";

import Header from './components/Header/header';
import Panel from './components/Panel/panel';
import SelectShow from './components/Panel/selectShow';
import SelectSeat from './components/Panel/selectSeat';
import ReservationCheck from './components/Panel/reservationCheck';
import ReservationDone from './components/Panel/reservationDone';

function App() {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    console.log(state);
  },[state]);

  return (
    <div className={styles.App}>
      <Header 
        state={state}
        setState={setState}/>
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

export default App;
